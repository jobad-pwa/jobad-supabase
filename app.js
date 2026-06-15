// app.js
let supabase;
let currentMobile = '';
let currentAction = '';

async function initSupabase() {
    supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('Supabase initialized');
}

async function handleAction() {
    const mobile = document.getElementById('mobile-input').value.trim();
    const pin = document.getElementById('pin-input').value.trim();
    const actionBtn = document.getElementById('action-btn');
    
    if (!mobile || mobile.length !== 10) {
        showMessage('Please enter valid 10-digit mobile number', 'red');
        return;
    }
    
    if (currentAction === 'login' || currentAction === 'register') {
        if (!pin || pin.length !== 4) {
            showMessage('Please enter 4-digit PIN', 'red');
            return;
        }
        
        if (currentAction === 'login') {
            const { data: userData } = await supabase
                .from('active_users')
                .select('*')
                .eq('mobile', mobile)
                .single();
            
            if (userData && userData.pin_hash === pin) {
                showMessage('✅ Login successful!', 'green');
                showDashboard(mobile, userData);
            } else {
                showMessage('❌ Invalid PIN.', 'red');
            }
        } else if (currentAction === 'register') {
            const newUser = {
                mobile: mobile,
                pin_hash: pin,
                full_name: '',
                job_title: '',
                created_at: new Date().toISOString(),
                last_active: new Date().toISOString()
            };
            
            const { error: insertError } = await supabase
                .from('active_users')
                .insert([newUser]);
            
            if (insertError) {
                showMessage('Registration failed: ' + insertError.message, 'red');
                return;
            }
            
            const { data: statsData } = await supabase
                .from('platform_stats')
                .select('mobile_list')
                .single();
            
            const updatedList = [...statsData.mobile_list, mobile];
            await supabase
                .from('platform_stats')
                .update({ mobile_list: updatedList });
            
            showMessage('✅ Registration successful!', 'green');
            showDashboard(mobile, newUser);
        }
        return;
    }
    
    showMessage('⏳ Checking...', 'blue');
    actionBtn.disabled = true;
    actionBtn.innerText = 'Checking...';
    
    try {
        const response = await fetch('https://njhioapckeupxrcixmdh.supabase.co/functions/v1/sync-google-sheets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: mobile })
        });
        
        const data = await response.json();
        
        if (data.exists && data.inActiveUsers) {
            currentMobile = mobile;
            currentAction = 'login';
            document.getElementById('pin-container').style.display = 'block';
            document.getElementById('pin-label').innerHTML = 'Enter your PIN *';
            actionBtn.innerText = '🔐 Login';
            showMessage('Enter your PIN to login', 'green');
        } else if (data.exists && !data.inActiveUsers) {
            currentMobile = mobile;
            currentAction = 'register';
            document.getElementById('pin-container').style.display = 'block';
            document.getElementById('pin-label').innerHTML = 'Create a PIN *';
            actionBtn.innerText = '📝 Activate';
            showMessage('Create a PIN to activate your account', 'blue');
        } else {
            currentMobile = mobile;
            currentAction = 'register';
            document.getElementById('pin-container').style.display = 'block';
            document.getElementById('pin-label').innerHTML = 'Create a PIN *';
            actionBtn.innerText = '📝 Register';
            showMessage('New user! Create a PIN to register', 'blue');
        }
    } catch (err) {
        showMessage('Error: ' + err.message, 'red');
    } finally {
        actionBtn.disabled = false;
    }
}

function showDashboard(mobile, userData) {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('welcome-msg').innerHTML = `Welcome ${mobile}!`;
}

function showMessage(msg, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.classList.remove('hidden');
    messageDiv.innerHTML = msg;
    const colors = { red: 'bg-red-100 text-red-700', green: 'bg-green-100 text-green-700', blue: 'bg-blue-100 text-blue-700' };
    messageDiv.className = `mt-4 p-3 rounded-lg text-sm ${colors[type] || colors.blue}`;
    setTimeout(() => messageDiv.classList.add('hidden'), 5000);
}

function logout() { location.reload(); }

// Reset when mobile changes
document.getElementById('mobile-input')?.addEventListener('input', function() {
    document.getElementById('pin-container').style.display = 'none';
    document.getElementById('action-btn').innerText = 'Check Mobile';
    document.getElementById('action-btn').disabled = false;
    currentAction = '';
});

initSupabase();

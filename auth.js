// auth.js - Complete working version

// Initialize Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentMobile = '';
let isExistingUser = false;

// Show message function
function showMessage(msg, type) {
    const div = document.getElementById('message');
    if (!div) return;
    div.innerHTML = msg;
    div.classList.remove('hidden');
    if (type === 'error') {
        div.className = 'mt-4 p-3 rounded-lg text-center bg-red-100 text-red-700';
    } else if (type === 'success') {
        div.className = 'mt-4 p-3 rounded-lg text-center bg-green-100 text-green-700';
    } else {
        div.className = 'mt-4 p-3 rounded-lg text-center bg-blue-100 text-blue-700';
    }
}

// Step 1: Check Mobile
window.checkMobile = async function() {
    console.log('checkMobile called');
    const mobile = document.getElementById('mobile').value.trim();
    
    if (!mobile || mobile.length !== 10) {
        showMessage('Please enter 10-digit mobile number', 'error');
        return;
    }
    
    currentMobile = mobile;
    showMessage('Checking mobile number...', 'info');
    
    try {
        const response = await fetch('https://njhioapckeupxrcixmdh.supabase.co/functions/v1/sync-google-sheets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: mobile })
        });
        
        const data = await response.json();
        console.log('Response:', data);
        
        if (data.exists && data.inActiveUsers) {
            isExistingUser = true;
            showMessage('✅ User found! Enter your PIN', 'success');
        } else {
            isExistingUser = false;
            showMessage('📱 New user! Create a PIN to register', 'success');
        }
        
        // Show PIN input
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
        document.getElementById('pin').value = '';
        
    } catch (err) {
        console.error('Error:', err);
        showMessage('Error: ' + err.message, 'error');
    }
};

// Step 2: Submit PIN
window.submitPin = async function() {
    console.log('submitPin called');
    const pin = document.getElementById('pin').value.trim();
    
    if (!pin || pin.length !== 4) {
        showMessage('Please enter 4-digit PIN', 'error');
        return;
    }
    
    showMessage('Processing...', 'info');
    
    try {
        if (isExistingUser) {
            // LOGIN
            const { data: user, error } = await supabase
                .from('active_users')
                .select('pin_hash')
                .eq('mobile', currentMobile)
                .single();
            
            if (error) {
                showMessage('User not found', 'error');
                return;
            }
            
            if (user.pin_hash === pin) {
                showMessage('✅ Login successful! Welcome ' + currentMobile, 'success');
                setTimeout(resetForm, 2000);
            } else {
                showMessage('❌ Wrong PIN. Try again.', 'error');
                document.getElementById('pin').value = '';
            }
        } else {
            // REGISTER
            const newUser = {
                mobile: currentMobile,
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
                showMessage('Registration failed: ' + insertError.message, 'error');
                return;
            }
            
            // Add to platform_stats
            const { data: stats } = await supabase
                .from('platform_stats')
                .select('mobile_list')
                .single();
            
            if (stats && !stats.mobile_list.includes(currentMobile)) {
                await supabase
                    .from('platform_stats')
                    .update({ mobile_list: [...stats.mobile_list, currentMobile] });
            }
            
            showMessage('✅ Registration successful! Welcome ' + currentMobile, 'success');
            setTimeout(resetForm, 2000);
        }
    } catch (err) {
        console.error('Error:', err);
        showMessage('Error: ' + err.message, 'error');
    }
};

// Reset form
window.resetForm = function() {
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('mobile').value = '';
    document.getElementById('pin').value = '';
    document.getElementById('message').innerHTML = '';
    currentMobile = '';
    isExistingUser = false;
};

console.log('auth.js loaded');

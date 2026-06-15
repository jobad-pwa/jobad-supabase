// Initialize Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentMobile = '';
let isExistingUser = false;

// Show message
function showMessage(msg, type) {
    const div = document.getElementById('message');
    div.innerHTML = msg;
    div.className = `mt-4 p-3 rounded-lg text-center bg-${type === 'error' ? 'red' : type === 'success' ? 'green' : 'blue'}-100 text-${type === 'error' ? 'red' : type === 'success' ? 'green' : 'blue'}-700`;
}

// Step 1: Check Mobile
window.checkMobile = async function() {
    const mobile = document.getElementById('mobile').value.trim();
    if (!mobile || mobile.length !== 10) {
        showMessage('Enter 10-digit mobile', 'error');
        return;
    }
    
    currentMobile = mobile;
    showMessage('Checking...', 'info');
    
    try {
        const res = await fetch('https://njhioapckeupxrcixmdh.supabase.co/functions/v1/sync-google-sheets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: mobile })
        });
        const data = await res.json();
        
        isExistingUser = data.exists && data.inActiveUsers;
        showMessage(isExistingUser ? '✅ User found! Enter PIN' : '📱 New user! Create PIN', 'success');
        
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    } catch (err) {
        showMessage('Error: ' + err.message, 'error');
    }
};

// Step 2: Submit PIN
window.submitPin = async function() {
    const pin = document.getElementById('pin').value.trim();
    if (!pin || pin.length !== 4) {
        showMessage('Enter 4-digit PIN', 'error');
        return;
    }
    
    showMessage('Processing...', 'info');
    
    try {
        if (isExistingUser) {
            // Login
            const { data: user } = await supabase
                .from('active_users')
                .select('pin_hash')
                .eq('mobile', currentMobile)
                .single();
            
            if (user && user.pin_hash === pin) {
                showMessage('✅ Login successful! Welcome ' + currentMobile, 'success');
                setTimeout(resetForm, 2000);
            } else {
                showMessage('❌ Wrong PIN', 'error');
                document.getElementById('pin').value = '';
            }
        } else {
            // Register
            const { error } = await supabase
                .from('active_users')
                .insert([{
                    mobile: currentMobile,
                    pin_hash: pin,
                    created_at: new Date().toISOString()
                }]);
            
            if (error) throw error;
            
            // Add to platform_stats
            const { data: stats } = await supabase.from('platform_stats').select('mobile_list').single();
            if (stats && !stats.mobile_list.includes(currentMobile)) {
                await supabase.from('platform_stats').update({ 
                    mobile_list: [...stats.mobile_list, currentMobile] 
                });
            }
            
            showMessage('✅ Registration successful! Welcome ' + currentMobile, 'success');
            setTimeout(resetForm, 2000);
        }
    } catch (err) {
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
};

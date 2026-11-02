//<!-- Custom Script with Dynamic Phone & Country Logic -->
        let currentTab = 'individual';

        // Mapping Country Dial Codes & Validations
        const countryPhoneConfig = {
            'IN': { code: '+91', placeholder: '10-digit mobile number', pattern: '[0-9]{10}', maxlength: 10, help: 'Enter 10-digit Indian phone number', currency: 'INR (₹)', symbol: '₹' },
            'US': { code: '+1', placeholder: '10-digit phone number', pattern: '[0-9]{10}', maxlength: 10, help: 'Enter 10-digit US phone number', currency: 'USD ($)', symbol: '$' },
            'GB': { code: '+44', placeholder: '10 to 11-digit number', pattern: '[0-9]{10,11}', maxlength: 11, help: 'Enter UK phone number without leading 0', currency: 'GBP (£)', symbol: '£' },
            'CA': { code: '+1', placeholder: '10-digit phone number', pattern: '[0-9]{10}', maxlength: 10, help: 'Enter 10-digit Canadian phone number', currency: 'CAD ($)', symbol: '$' },
            'AU': { code: '+61', placeholder: '9-digit phone number', pattern: '[0-9]{9}', maxlength: 9, help: 'Enter 9-digit Australian number', currency: 'AUD ($)', symbol: '$' },
            'AE': { code: '+971', placeholder: '9-digit phone number', pattern: '[0-9]{9}', maxlength: 9, help: 'Enter 9-digit UAE phone number', currency: 'AED', symbol: 'AED ' },
            'OTHER': { code: '+', placeholder: 'Include country code & number', pattern: '[0-9]{8,15}', maxlength: 15, help: 'Enter valid international phone number (8-15 digits)', currency: 'USD ($)', symbol: '$' }
        };

        function setActiveTab(tab) {
            currentTab = tab;
            const indFields = document.querySelectorAll('.ind-field');
            const corpFields = document.querySelectorAll('.corp-field');

            if (tab === 'individual') {
                indFields.forEach(f => f.setAttribute('required', 'required'));
                corpFields.forEach(f => f.removeAttribute('required'));
            } else {
                corpFields.forEach(f => f.setAttribute('required', 'required'));
                indFields.forEach(f => f.removeAttribute('required'));
            }
        }

        // Handles Country-based Phone Masking and Custom Tax/Address Inputs
        function handleCountryChange(type) {
            const countryVal = document.getElementById(type + 'Country').value;
            const config = countryPhoneConfig[countryVal] || countryPhoneConfig['OTHER'];

            // Update Phone Fields
            const prefixEl = document.getElementById(type + 'PhonePrefix');
            const phoneInput = document.getElementById(type + 'Phone');
            const helpEl = document.getElementById(type + 'PhoneHelp');

            prefixEl.innerText = config.code;
            phoneInput.placeholder = config.placeholder;
            phoneInput.setAttribute('pattern', config.pattern);
            phoneInput.setAttribute('maxlength', config.maxlength);
            phoneInput.value = ''; // Reset input to ensure fresh entry
            helpEl.innerText = config.help;

            // Update Currency Symbol
            document.getElementById('currencyBadge').innerText = 'Currency: ' + config.currency;
            document.getElementById('currencySymbol').innerText = config.symbol;

            // Handle Tax/PAN visibility for India vs International Donors
            if (type === 'ind') {
                const taxSec = document.getElementById('indTaxSection');
                if (countryVal === 'IN') {
                    taxSec.innerHTML = `
                        <label class="form-label fw-semibold">PAN Card Number (Required for 80G Tax Exemption Receipt in India)</label>
                        <input type="text" class="form-control text-uppercase" placeholder="Enter your PAN Card number" maxlength="10">
                    `;
                } else {
                    taxSec.innerHTML = `
                        <label class="form-label fw-semibold">Passport Number / Foreign Tax Identifier (Optional)</label>
                        <input type="text" class="form-control" placeholder="Enter passport number or foreign Tax ID">
                    `;
                }
            }
        }

        function showPartnerDetails(name, description, imageSrc) {
            document.getElementById('partnerName').innerText = name;
            document.getElementById('partnerDescription').innerText = description;
            
            var logoContainer = document.getElementById('partnerLogoContainer');
            logoContainer.innerHTML = '<img src="' + imageSrc + '" class="img-fluid mb-2" style="max-height: 80px; object-fit: contain;" onerror="this.style.display=\'none\'">';

            var partnerModal = new bootstrap.Modal(document.getElementById('partnerModal'));
            partnerModal.show();
        }

        function toggleOthersInput(selectId, boxId) {
            var selectElement = document.getElementById(selectId);
            var othersBox = document.getElementById(boxId);
            var othersInput = othersBox.querySelector('input');
            
            if (selectElement.value === 'Others') {
                othersBox.classList.remove('d-none');
                othersInput.setAttribute('required', 'required');
            } else {
                othersBox.classList.add('d-none');
                othersInput.removeAttribute('required');
            }
        }

        function handleDonationSubmit(event) {
            event.preventDefault();
            
            // Validate Phone Number Length
            const activeCountry = (currentTab === 'individual') ? document.getElementById('indCountry').value : document.getElementById('corpCountry').value;
            const phoneVal = (currentTab === 'individual') ? document.getElementById('indPhone').value : document.getElementById('corpPhone').value;

            if (activeCountry === 'IN' && phoneVal.length !== 10) {
                alert('Please enter a valid 10-digit Indian phone number.');
                return;
            }

            // Displays Payment Gateway Modal
            var paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
            paymentModal.show();
        }

        // Sets default active tab and country configuration on DOM content load
        document.addEventListener('DOMContentLoaded', () => {
            setActiveTab('individual');
            handleCountryChange('ind');
            handleCountryChange('corp');
        });
        // Function to handle switching tabs properly and fixing responsiveness
function setActiveTab(tabType) {
    const individualTab = document.getElementById('individual');
    const corporateTab = document.getElementById('corporate');
    const individualBtn = document.getElementById('individual-tab');
    const corporateBtn = document.getElementById('corporate-tab');

    if (tabType === 'individual') {
        individualTab.classList.add('show', 'active');
        corporateTab.classList.remove('show', 'active');
        individualBtn.classList.add('active');
        corporateBtn.classList.remove('active');
        
        // Toggle required attributes to prevent validation blocking on hidden fields
        setFieldsRequired('.ind-field', true);
        setFieldsRequired('.corp-field', false);
    } else if (tabType === 'corporate') {
        corporateTab.classList.add('show', 'active');
        individualTab.classList.remove('show', 'active');
        corporateBtn.classList.add('active');
        individualBtn.classList.remove('active');

        // Toggle required attributes
        setFieldsRequired('.corp-field', true);
        setFieldsRequired('.ind-field', false);
    }
}

// Helper function to manage required fields dynamically so form validation doesn't freeze
function setFieldsRequired(selector, isRequired) {
    const fields = document.querySelectorAll(selector);
    fields.forEach(field => {
        if (isRequired) {
            field.setAttribute('required', 'true');
        } else {
            field.removeAttribute('required');
        }
    });
}

// Ensure click event listeners are bound to corporate and individual tabs securely
document.addEventListener('DOMContentLoaded', function() {
    const indTabBtn = document.getElementById('individual-tab');
    const corpTabBtn = document.getElementById('corporate-tab');

    if (indTabBtn) {
        indTabBtn.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveTab('individual');
        });
    }

    if (corpTabBtn) {
        corpTabBtn.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveTab('corporate');
        });
    }
});
  
      // ===================================================
      // 24/7 AI CHATBOT LOGIC ENGINE
      // ===================================================
      function toggleTlfChat() {
        const win = document.getElementById('tlfChatWindow');
        const icon = document.getElementById('tlfChatIcon');
        if (win.style.display === 'flex') {
          win.style.display = 'none';
          icon.className = 'icon-chat';
        } else {
          win.style.display = 'flex';
          icon.className = 'icon-close';
          document.getElementById('tlfChatInput').focus();
        }
      }

      function sendSuggestedQuery(text) {
        document.getElementById('tlfChatInput').value = text;
        handleChatSubmit(new Event('submit'));
      }

      function handleChatSubmit(e) {
        if (e) e.preventDefault();
        const input = document.getElementById('tlfChatInput');
        const query = input.value.trim();
        if (!query) return false;

        appendChatMessage(query, 'user');
        input.value = '';

        const indicator = document.getElementById('tlfTypingIndicator');
        indicator.style.display = 'block';
        scrollChatToBottom();

        // 24/7 AI Response Engine
        setTimeout(() => {
          indicator.style.display = 'none';
          const reply = generateAiResponse(query);
          appendChatMessage(reply, 'bot');
          scrollChatToBottom();
        }, 600);

        return false;
      }

      function appendChatMessage(text, sender) {
        const body = document.getElementById('tlfChatBody');
        const msgDiv = document.createElement('div');
        msgDiv.className = `tlf-chat-msg ${sender}`;
        msgDiv.innerHTML = text;
        body.insertBefore(msgDiv, document.getElementById('tlfTypingIndicator'));
      }

      function scrollChatToBottom() {
        const body = document.getElementById('tlfChatBody');
        body.scrollTop = body.scrollHeight;
      }

      function generateAiResponse(input) {
        const text = input.toLowerCase();
        
        if (text.includes('donate') || text.includes('donation') || text.includes('payment') || text.includes('upi')) {
          return 'You can donate directly to Towards Life Foundation using our <a href="donate.html" style="color:#027bb9; font-weight:bold;">Donate Section</a> via UPI, Credit/Debit Cards, or Bank Transfer. Every rupee supports education and nutritional drives for street children!';
        }
        else if (text.includes('volunteer') || text.includes('join') || text.includes('teacher')) {
          return 'TLF accepts volunteer teachers exclusively from <strong>EIILM Kolkata</strong> (BCA, BBA, MCA, MBA). You can sign up through our <a href="volunteer.html" style="color:#027bb9; font-weight:bold;">Volunteer Section</a>!';
        }
        else if (text.includes('shop') || text.includes('product') || text.includes('tote') || text.includes('candle') || text.includes('buy')) {
          return 'Our children craft wonderful handmade items including painted Tote Bags (₹450) and Organic Scented Candles (₹120). Check out <a href="shop.html" style="color:#027bb9; font-weight:bold;">Our Shop</a> or visit the full marketplace!';
        }
        else if (text.includes('centre') || text.includes('center') || text.includes('location') || text.includes('where')) {
          return 'TLF runs 8 active learning centres across Kolkata, including Tollygunge, Chetla, Bidhannagar, Shyambazar, and Dum Dum, serving over 1,000 pavement children.';
        }
        else if (text.includes('about') || text.includes('who') || text.includes('mission') || text.includes('tlf')) {
          return 'Towards Life Foundation (TLF) is a CSR initiative originated at EIILM Kolkata dedicated to providing education, health, and economic self-reliance to pavement dwellers.';
        }
        else if (text.includes('contact') || text.includes('phone') || text.includes('email') || text.includes('address')) {
          return 'Reach us at <strong>info@towardslifefoundation.org</strong> or call <strong>+91 33 2289 7780</strong> at the EIILM Kolkata campus.';
        }
        else {
          return "I'm sorry, I don't have information about that. Please contact our office directly:\n\nOffice Address: EIILM Kolkata Campus, Kolkata, West Bengal, India\nPhone: +91 33 2289 7780\nEmail: info@towardslifefoundation.org";
        }
      }

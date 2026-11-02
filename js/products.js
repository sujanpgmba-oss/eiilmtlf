let activeProduct = { title: '', price: 0 };
let productDetails = { title: '', description: '', price: 0, image: '', category: '' };

function openProductDetailsFromCard(card) {
  const image = card.querySelector('.product-img-wrap img');
  openProductDetails(
    card.querySelector('.product-title').innerText.trim(),
    card.querySelector('.product-desc').innerText.trim(),
    parseInt(card.querySelector('.product-price').innerText.replace(/[^\d]/g, ''), 10),
    image.getAttribute('src'),
    card.querySelector('.product-badge').innerText.trim()
  );
}

function openProductDetails(title, description, price, image, category) {
  productDetails = {
    title: title,
    description: description,
    price: price,
    image: image,
    category: category
  };

  document.getElementById('productDetailsCategory').innerText = productDetails.category;
  document.getElementById('productDetailsTitle').innerText = productDetails.title;
  document.getElementById('productDetailsInfoTitle').innerText = productDetails.title;
  document.getElementById('productDetailsDescription').innerText = productDetails.description;
  document.getElementById('productDetailsPrice').innerText = '₹' + productDetails.price;

  const detailsImage = document.getElementById('productDetailsImage');
  detailsImage.src = productDetails.image;
  detailsImage.alt = productDetails.title;

  $('#productDetailsModal').modal('show');
}

function handleProductCardKeydown(event, card) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openProductDetailsFromCard(card);
  }
}

function buyProductFromDetails() {
  $('#productDetailsModal').one('hidden.bs.modal', function () {
    openCheckoutModal(productDetails.title, productDetails.price, productDetails.image);
  }).modal('hide');
}

      function openCheckoutModal(title, price, img) {
        activeProduct.title = title;
        activeProduct.price = price;
        document.getElementById('modalProductTitle').innerText = title;
        document.getElementById('modalProductPrice').innerText = '₹' + price;
        document.getElementById('modalProductImg').src = img || 'images/IMG_20260129_164638_736.jpg.jpeg';
        document.getElementById('payTotalAmount').innerText = '₹' + price;

        document.getElementById('checkoutForm').reset();
        document.getElementById('checkoutForm').style.display = 'block';
        document.getElementById('paymentGatewaySection').style.display = 'none';
        document.getElementById('othersInputWrapper').style.display = 'none';

        document.getElementById('qrCodeImg').src = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=towardslifefoundation@sbi&pn=TLF&am=${price}&cu=INR`;
        $('#checkoutModal').modal('show');
      }

      function checkReferralSource() {
        const val = document.getElementById('referralSource').value;
        const wrap = document.getElementById('othersInputWrapper');
        const textInput = document.getElementById('referralOthersText');
        if (val === 'Others') {
          wrap.style.display = 'block';
          textInput.required = true;
        } else {
          wrap.style.display = 'none';
          textInput.required = false;
          textInput.value = '';
        }
      }

      function proceedToPayment(e) {
        e.preventDefault();
        const name = document.getElementById('shipName').value.trim();
        const phone = document.getElementById('shipPhone').value.trim();
        const address = document.getElementById('shipAddress').value.trim();
        const pin = document.getElementById('shipPin').value.trim();
        const district = document.getElementById('shipDistrict').value.trim();
        const state = document.getElementById('shipState').value.trim();
        const ref = document.getElementById('referralSource').value;

        if (!name || !phone || !address || !pin || !district || !state || !ref) {
          alert('Please fill up all required delivery address and referral fields.');
          return;
        }
        if (phone.length !== 10 || isNaN(phone)) {
          alert('Please enter a valid 10-digit phone number.');
          return;
        }
        if (ref === 'Others' && !document.getElementById('referralOthersText').value.trim()) {
          alert('Please specify your referral source in the Others text box.');
          return;
        }

        document.getElementById('checkoutForm').style.display = 'none';
        document.getElementById('paymentGatewaySection').style.display = 'block';
      }

      function backToForm() {
        document.getElementById('paymentGatewaySection').style.display = 'none';
        document.getElementById('checkoutForm').style.display = 'block';
      }

      function completeBooking(gateway) {
        const name = document.getElementById('shipName').value;
        const phone = document.getElementById('shipPhone').value;
        $('#checkoutModal').modal('hide');
        alert(`✅ Booking / Order Confirmed Successfully!\n\nThank you, ${name}!\nItem: ${activeProduct.title}\nAmount Paid: ₹${activeProduct.price} via ${gateway}\n\nConfirmation message & tracking details sent to ${phone}.`);
      }

      function filterMarketplace(cat, btn) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.product-item').forEach(item => {
          if (cat === 'all' || item.getAttribute('data-category') === cat) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      }

      function searchProducts() {
        const q = document.getElementById('marketplaceSearch').value.toLowerCase();
        document.querySelectorAll('.product-item').forEach(item => {
          const t = item.querySelector('.product-title').innerText.toLowerCase();
          const d = item.querySelector('.product-desc').innerText.toLowerCase();
          item.style.display = (t.includes(q) || d.includes(q)) ? 'block' : 'none';
        });
      }
  
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
// Global variable for current price
let currentCheckoutPrice = 0;

// 1. Open Checkout Modal from Product Card
function openCheckoutModal(title, price, imageSrc) {
  currentCheckoutPrice = price;
  
  // Set Modal Info
  document.getElementById('modalProductTitle').innerText = title;
  document.getElementById('modalProductPrice').innerText = '₹' + price;
  
  const imgElem = document.getElementById('modalProductImg');
  if (imgElem) imgElem.src = imageSrc;
  
  const totalElem = document.getElementById('payTotalAmount');
  if (totalElem) totalElem.innerText = '₹' + price;

  // Generate UPI QR Code dynamically
  const upiId = 'towardslifefoundation@sbi';
  const upiUrl = `upi://pay?pa=${upiId}&pn=Towards%20Life%20Foundation&am=${price}&cu=INR`;
  const qrImg = document.getElementById('qrCodeImg');
  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(upiUrl)}`;
  }

  // Ensure Form is visible and Gateway section is hidden when modal opens
  const formElem = document.getElementById('checkoutForm');
  const gatewayElem = document.getElementById('paymentGatewaySection');
  
  if (formElem) formElem.style.display = 'block';
  if (gatewayElem) gatewayElem.style.display = 'none';

  // Open Bootstrap Modal
  $('#checkoutModal').modal('show');
}

// 2. Proceed to Payment Gateway (Triggered on Submit)
function proceedToPayment(event) {
  if (event) event.preventDefault();

  const form = document.getElementById('checkoutForm');
  
  // Check browser validation (required fields)
  if (form && !form.checkValidity()) {
    form.reportValidity();
    return false;
  }

  // Smooth Transition: Hide Form, Show Payment Gateway
  $('#checkoutForm').slideUp(250, function() {
    $('#paymentGatewaySection').fadeIn(250);
  });

  return false; // Prevent default form submit reload
}

// 3. Back to Address Form
function backToForm() {
  $('#paymentGatewaySection').fadeOut(250, function() {
    $('#checkoutForm').slideDown(250);
  });
}

// 4. Complete Booking
function completeBooking(paymentMethod) {
  alert(`Payment successful via ${paymentMethod}! Thank you for supporting Towards Life Foundation.`);
  $('#checkoutModal').modal('hide');
  const form = document.getElementById('checkoutForm');
  if (form) form.reset();
}

// 5. Referral "Others" Input Toggle
function checkReferralSource() {
  const select = document.getElementById('referralSource');
  const othersWrapper = document.getElementById('othersInputWrapper');
  const othersText = document.getElementById('referralOthersText');
  
  if (select && othersWrapper && othersText) {
    if (select.value === 'Others') {
      othersWrapper.style.display = 'block';
      othersText.setAttribute('required', 'true');
    } else {
      othersWrapper.style.display = 'none';
      othersText.removeAttribute('required');
    }
  }
}
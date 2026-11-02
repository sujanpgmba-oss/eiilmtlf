
      function openAdminPortal() {
        $('#adminLoginModal').modal('show');
      }

      // 2. Sign In / New User switcher
      function switchAuthTab(tab) {
        const signInPanel = document.getElementById('signInPanel');
        const signUpPanel = document.getElementById('signUpPanel');
        const signInTab = document.getElementById('signInTab');
        const newUserTab = document.getElementById('newUserTab');

        const isSignIn = tab === 'signin';
        signInPanel.style.display = isSignIn ? 'block' : 'none';
        signUpPanel.style.display = isSignIn ? 'none' : 'block';
        signInTab.classList.toggle('active', isSignIn);
        newUserTab.classList.toggle('active', !isSignIn);
      }

      // 3. New user registration (front-end demo)
      function handleNewUserRegistration(event) {
        event.preventDefault();
        const name = document.getElementById('newUserName').value.trim();
        const email = document.getElementById('newUserEmail').value.trim();
        const userId = document.getElementById('newUserId').value.trim();

        if (!name || !email || !userId) {
          alert('Please complete all registration details.');
          return false;
        }

        TLFData.add('users', {name, email, userId, role:'New User'});
        alert(`Welcome, ${name}! Your new user account has been created successfully and saved.`);
        document.querySelector('#signUpPanel form').reset();
        switchAuthTab('signin');
        return false;
      }

      // 4. User Sign-in Handler
      function handleUserLogin(event) {
        event.preventDefault();
        $('#userLoginModal').modal('hide');
        const loginField = document.querySelector('#userLoginModal input');
        const identity = loginField ? loginField.value.trim() : 'User';
        TLFData.add('loginAudit', {identity, role:'User', action:'Sign In'});
        alert('Volunteer / Student Sign-in Verified.');
        return false;
      }

      // 3. Admin Authentication with Emp ID
      function handleAdminLogin(event) {
        event.preventDefault();
        const empId = document.getElementById('adminEmpId').value.trim();
        const email = document.getElementById('adminEmail').value.trim();
        const pass = document.getElementById('adminPass').value.trim();

        if (empId === "" || email === "" || pass === "") {
          alert('Please provide all admin credentials.');
          return false;
        }

        TLFData.add('loginAudit', {identity: empId, role:'Admin', action:'Admin Sign In'});
        $('#adminLoginModal').modal('hide');
        const adminSection = document.getElementById('admin-section');
        adminSection.style.display = 'block';

        document.getElementById('adminSessionEmpBadge').innerText = `AUTHENTICATED: ${empId.toUpperCase()}`;
        adminSection.scrollIntoView({ behavior: 'smooth' });

        alert(`Welcome, Admin (${empId})! Administrative controls are now unlocked.`);
        return false;
      }

      // 4. Admin Session Exit
      function exitAdminSession() {
        if (confirm('Do you want to log out of the Admin Panel?')) {
          document.getElementById('admin-section').style.display = 'none';
          alert('Admin session ended securely.');
          window.location.href = '#home-section';
        }
      }

      // 5. Dynamic Client-Side Product Insertion
      function adminAddNewProduct() {
        const title = prompt("Enter New Product Title:", "Handmade Bamboo Lamp");
        if (!title) return;
        const category = prompt("Enter Category:", "Crafts");
        const price = prompt("Enter Price (INR):", "350");

        if (title && price) {
          $('#adminProductTable tbody').append(`
            <tr>
              <td>${title}</td>
              <td>${category || 'General'}</td>
              <td>₹${price}</td>
              <td>50</td>
              <td><button class="btn btn-sm btn-outline-danger" onclick="$(this).closest('tr').remove()">Remove</button></td>
            </tr>
          `);

          $('#publicProductGrid').append(`
            <div class="col-md-4 text-center mb-4">
              <div class="card p-3 shadow-sm border-0 h-100">
                <img src="images/IMG-20260108-WA0042.jpg.jpeg" class="card-img-top img-fluid mb-3 rounded" alt="${title}" style="height: 200px; object-fit: cover;">
                <h4>${title}</h4>
                <p class="text-muted small">${category || 'Handcrafted'}</p>
                <h5 class="text-success font-weight-bold">₹${price}</h5>
                <button class="btn btn-warning btn-block mt-auto font-weight-bold">Buy Now</button>
              </div>
            </div>
          `);

          TLFData.add('products', {title, category: category || 'General', price: parseFloat(price), stock:50});
          alert('Product added successfully to both the Admin Catalog and Public Shop! Data has been saved for Excel export.');
        }
      }

      // 6. Social Media Post Manager
      let socialPosts = JSON.parse(localStorage.getItem('tlfSocialPosts') || '[]');

      function toggleSocialSchedule() {
        const scheduled = document.getElementById('socialScheduleMode').value === 'scheduled';
        document.getElementById('socialScheduleFields').style.display = scheduled ? 'flex' : 'none';
        document.getElementById('socialSubmitBtn').innerHTML = scheduled
          ? '<span class="icon-calendar mr-1"></span> Schedule Post'
          : '<span class="icon-paper-plane mr-1"></span> Post Now';
        document.getElementById('socialPostDate').required = scheduled;
        document.getElementById('socialPostTime').required = scheduled;
      }

      function updateSocialPreview() {
        const title = document.getElementById('socialPostTitle').value.trim();
        const content = document.getElementById('socialPostContent').value.trim();
        const tags = document.getElementById('socialPostHashtags').value.trim();
        document.getElementById('previewSocialTitle').textContent = title || 'Your post title will appear here';
        document.getElementById('previewSocialContent').textContent = content || 'Your post content will appear here.';
        document.getElementById('previewSocialTags').textContent = tags;
      }

      function saveSocialPost(event) {
        event.preventDefault();
        const mode = document.getElementById('socialScheduleMode').value;
        const title = document.getElementById('socialPostTitle').value.trim();
        const content = document.getElementById('socialPostContent').value.trim();
        const platform = document.getElementById('socialPlatform').value;
        const type = document.getElementById('socialPostType').value;
        const hashtags = document.getElementById('socialPostHashtags').value.trim();
        let publishAt = new Date();

        if (mode === 'scheduled') {
          const date = document.getElementById('socialPostDate').value;
          const time = document.getElementById('socialPostTime').value;
          publishAt = new Date(date + 'T' + time);
          if (!date || !time || Number.isNaN(publishAt.getTime()) || publishAt <= new Date()) {
            alert('Please choose a valid future date and time.');
            return false;
          }
        }

        const post = {
          id: Date.now(), type, platform, title, content, hashtags,
          publishAt: publishAt.toISOString(), status: mode === 'scheduled' ? 'Scheduled' : 'Published'
        };
        socialPosts.unshift(post);
        localStorage.setItem('tlfSocialPosts', JSON.stringify(socialPosts));
        renderSocialPosts();
        alert(mode === 'scheduled'
          ? `Post scheduled successfully for ${publishAt.toLocaleString()}.`
          : `${type} post published in demo mode to ${platform}.`);
        resetSocialPostForm();
        return false;
      }

      function renderSocialPosts() {
        const tbody = document.querySelector('#socialPostsTable tbody');
        const empty = document.getElementById('socialEmptyState');
        tbody.innerHTML = '';
        empty.style.display = socialPosts.length ? 'none' : 'block';
        socialPosts.forEach(post => {
          const row = document.createElement('tr');
          const publishDate = new Date(post.publishAt);
          const statusClass = post.status === 'Scheduled' ? 'badge-warning' : 'badge-success';
          row.innerHTML = `
            <td><span class="badge badge-info">${escapeSocialHtml(post.type)}</span></td>
            <td>${escapeSocialHtml(post.platform)}</td>
            <td><strong>${escapeSocialHtml(post.title)}</strong></td>
            <td>${publishDate.toLocaleString()}</td>
            <td><span class="badge ${statusClass}">${escapeSocialHtml(post.status)}</span></td>
            <td><button class="btn btn-sm btn-outline-danger" onclick="deleteSocialPost(${post.id})">Delete</button></td>`;
          tbody.appendChild(row);
        });
      }

      function deleteSocialPost(id) {
        socialPosts = socialPosts.filter(post => post.id !== id);
        localStorage.setItem('tlfSocialPosts', JSON.stringify(socialPosts));
        renderSocialPosts();
      }

      function clearSocialPosts() {
        if (!socialPosts.length || !confirm('Clear all social media post records?')) return;
        socialPosts = [];
        localStorage.removeItem('tlfSocialPosts');
        renderSocialPosts();
      }

      function resetSocialPostForm() {
        document.getElementById('socialPostForm').reset();
        document.getElementById('socialScheduleMode').value = 'now';
        toggleSocialSchedule();
        updateSocialPreview();
      }

      function escapeSocialHtml(value) {
        return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
      }

      ['socialPostTitle','socialPostContent','socialPostHashtags'].forEach(id => {
        document.addEventListener('input', function(event) {
          if (event.target && event.target.id === id) updateSocialPreview();
        });
      });

      document.addEventListener('DOMContentLoaded', renderSocialPosts);
function toggleDonorFields() {
    var donorType = document.getElementById('donorType').value;
    var citizenFields = document.getElementById('citizenFields');
    var corporateFields = document.getElementById('corporateFields');

    resetErrorMessages();

    if (donorType === 'citizen') {
      citizenFields.style.display = 'block';
      corporateFields.style.display = 'none';
    } else if (donorType === 'corporate') {
      citizenFields.style.display = 'none';
      corporateFields.style.display = 'block';
    } else {
      citizenFields.style.display = 'none';
      corporateFields.style.display = 'none';
    }
  }

  function resetErrorMessages() {
    var errorElements = document.querySelectorAll('.text-danger');
    errorElements.forEach(function (elem) {
      if (elem.id.endsWith('Err')) {
        elem.style.display = 'none';
      }
    });
  }

  function validateAndSubmitForm(event) {
    if (event) event.preventDefault();

    resetErrorMessages();
    var isValid = true;

    var donorType = document.getElementById('donorType').value;
    var amount = document.getElementById('donationAmount').value;

    if (!donorType) {
      document.getElementById('donorTypeErr').style.display = 'block';
      isValid = false;
    }

    if (donorType === 'citizen') {
      var name = document.getElementById('citizenName').value.trim();
      var phone = document.getElementById('citizenPhone').value.trim();
      var email = document.getElementById('citizenEmail').value.trim();
      var address = document.getElementById('citizenAddress').value.trim();
      var occupation = document.getElementById('citizenOccupation').value.trim();

      if (!name) { document.getElementById('citizenNameErr').style.display = 'block'; isValid = false; }
      if (!phone || phone.length !== 10) { document.getElementById('citizenPhoneErr').style.display = 'block'; isValid = false; }
      if (!email || !email.includes('@')) { document.getElementById('citizenEmailErr').style.display = 'block'; isValid = false; }
      if (!address) { document.getElementById('citizenAddressErr').style.display = 'block'; isValid = false; }
      if (!occupation) { document.getElementById('citizenOccupationErr').style.display = 'block'; isValid = false; }
    }

    if (donorType === 'corporate') {
      var corpName = document.getElementById('corpName').value.trim();
      var corpContact = document.getElementById('corpContact').value.trim();
      var corpPhone = document.getElementById('corpPhone').value.trim();
      var corpEmail = document.getElementById('corpEmail').value.trim();
      var corpAddress = document.getElementById('corpAddress').value.trim();

      if (!corpName) { document.getElementById('corpNameErr').style.display = 'block'; isValid = false; }
      if (!corpContact) { document.getElementById('corpContactErr').style.display = 'block'; isValid = false; }
      if (!corpPhone || corpPhone.length !== 10) { document.getElementById('corpPhoneErr').style.display = 'block'; isValid = false; }
      if (!corpEmail || !corpEmail.includes('@')) { document.getElementById('corpEmailErr').style.display = 'block'; isValid = false; }
      if (!corpAddress) { document.getElementById('corpAddressErr').style.display = 'block'; isValid = false; }
    }

    if (!amount || amount <= 0) {
      document.getElementById('amountErr').style.display = 'block';
      isValid = false;
    }

    if (isValid) {
      var record = {
        donorType: donorType,
        amount: parseFloat(amount),
        currency: 'INR'
      };
      
      if (typeof TLFData !== 'undefined' && TLFData.add) {
        TLFData.add('donations', record);
      }

      // Reset payment list before showing modal
      resetPaymentView();
      document.getElementById('modalAmount').innerText = amount;

      // Modal Open Logic
      var modalElement = document.getElementById('paymentModal');
      if (window.bootstrap && window.bootstrap.Modal) {
        var myModal = new bootstrap.Modal(modalElement);
        myModal.show();
      } else if (typeof $ !== 'undefined' && $('#paymentModal').modal) {
        $('#paymentModal').modal('show');
      } else {
        alert("Bootstrap JS is missing! Modal open kora jachhe na.");
      }
    }

    return false;
  }

  // Payment Selection Logic
  function selectPaymentMethod(method) {
    var optionsList = document.getElementById('paymentOptionsList');
    var selectedView = document.getElementById('selectedPaymentView');
    var actionArea = document.getElementById('paymentActionArea');
    var amount = document.getElementById('donationAmount').value;

    optionsList.style.display = 'none';
    selectedView.style.display = 'block';

    if (method === 'upi') {
      actionArea.innerHTML = `
        <div class="text-center p-3 bg-white rounded border shadow-sm">
          <h6 class="font-weight-bold text-dark mb-2">UPI Payment</h6>
          <p class="text-success font-weight-bold mb-1">towardslifefoundation@sbi</p>
          <div class="my-2">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=towardslifefoundation@sbi&pn=TowardsLifeFoundation&am=${amount}&cu=INR" alt="UPI QR Code" class="img-fluid border p-1 rounded">
          </div>
          <button type="button" class="btn btn-success btn-block font-weight-bold mt-2 w-100" onclick="alert('Redirecting to UPI Payment App...')">
            Pay ₹${amount} via UPI App
          </button>
        </div>
      `;
    } else if (method === 'card') {
      actionArea.innerHTML = `
        <div class="p-3 bg-white rounded border shadow-sm">
          <h6 class="font-weight-bold text-dark mb-3">Enter Card Details</h6>
          <input type="text" class="form-control mb-2" placeholder="Card Number">
          <div class="form-row row mb-2">
            <div class="col-6"><input type="text" class="form-control" placeholder="Expiration Date"></div>
            <div class="col-6"><input type="password" class="form-control" placeholder="CVV" maxlength="4"></div>
          </div>
          <h6 class="font-weight-bold text-dark mb-2">Card Holder Name</h6>
          <input type="text" class="form-control mb-2" placeholder="Full Name On Card">
          <button type="button" class="btn btn-success btn-block font-weight-bold mt-2 w-100" onclick="alert('Processing Card Payment...')">
            Pay ₹${amount} Now
          </button>
        </div>
      `;
    } else if (method === 'netbanking') {
      actionArea.innerHTML = `
        <div class="p-3 bg-white rounded border shadow-sm">
          <h6 class="font-weight-bold text-dark mb-3">Netbanking</h6>
          <label class="font-weight-bold text-dark">Select Your Bank</label>
          <select class="form-control mb-3">
            <option disabled selected>Select Bank</option>
            <option>State Bank of India</option>
            <option>HDFC Bank</option>
            <option>ICICI Bank</option>
            <option>Axis Bank</option>
          </select>
          <button type="button" class="btn btn-success btn-block font-weight-bold w-100" onclick="alert('Redirecting to Netbanking Gateway...')">
            Proceed to Pay ₹${amount}
          </button>
        </div>
      `;
    } else if (method === 'international') {
      actionArea.innerHTML = `
        <div class="p-3 bg-white rounded border shadow-sm text-center">
          <h6 class="font-weight-bold text-dark mb-2">International Donation</h6>
          <p class="small text-muted mb-3">Select preferred gateway for global cards / currency</p>
          <button type="button" class="btn btn-primary btn-block font-weight-bold mb-2 w-100" onclick="alert('Redirecting to PayPal...')">
            Pay via PayPal
          </button>
          <button type="button" class="btn btn-dark btn-block font-weight-bold w-100" onclick="alert('Redirecting to Stripe...')">
            Pay via Foreign Credit Card (Stripe)
          </button>
        </div>
      `;
    }
  }

  function resetPaymentView() {
    var optionsList = document.getElementById('paymentOptionsList');
    var selectedView = document.getElementById('selectedPaymentView');
    var actionArea = document.getElementById('paymentActionArea');

    if (optionsList) optionsList.style.display = 'block';
    if (selectedView) selectedView.style.display = 'none';
    if (actionArea) actionArea.innerHTML = '';
  }

      function handleStudentStatusChange() {
    var isEiilmYes = document.getElementById('eiilmYes').checked;
    var isEiilmNo = document.getElementById('eiilmNo').checked;

    var studentFields = document.getElementById('eiilmStudentFields');
    var nonStudentBlock = document.getElementById('nonStudentBlock');
    var checkErr = document.getElementById('eiilmCheckErr');

    if (checkErr) checkErr.style.display = 'none';

    if (isEiilmYes) {
        // Show detailed form fields for EIILM Kolkata students
        studentFields.style.display = 'block';
        nonStudentBlock.style.display = 'none';
    } else if (isEiilmNo) {
        // Hide form fields and show donation encouragement block for non-students
        studentFields.style.display = 'none';
        nonStudentBlock.style.display = 'block';
    }
}
// Dynamic Branch Location Dropdown Handler
function handleRegionChange() {
    var region = document.getElementById('volRegion').value;
    var branchSelect = document.getElementById('volBranch');

    branchSelect.innerHTML = ''; // Clear previous options
    branchSelect.disabled = false;

    var defaultOption = document.createElement('option');
    defaultOption.text = 'Select Branch Location';
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    branchSelect.appendChild(defaultOption);

    if (region === 'kolkata') {
        var kolkataBranches = ['Bidhannagar', 'Chetla', 'Tollygunge', 'Dumdum', 'Shyambazar'];
        kolkataBranches.forEach(function(branch) {
            var opt = document.createElement('option');
            opt.value = branch;
            opt.text = branch + ' (Kolkata)';
            branchSelect.appendChild(opt);
        });
    } else if (region === 'outside') {
        var outsideBranches = ['Nabadwip, West Bengal', 'Jalpaiguri, West Bengal'];
        outsideBranches.forEach(function(branch) {
            var opt = document.createElement('option');
            opt.value = branch;
            opt.text = branch;
            branchSelect.appendChild(opt);
        });
    }
}

// Real-time file validation (Max 5MB & Formats Check)
function validateFileRealtime() {
    var idCardInput = document.getElementById('volIdCard');
    var idErr = document.getElementById('volIdErr');
    
    idErr.style.display = 'none';
    idErr.innerText = '';

    if (idCardInput.files.length > 0) {
        var file = idCardInput.files[0];
        var fileSizeMB = file.size / (1024 * 1024);
        var allowedExtensions = ['image/jpeg', 'image/png', 'application/pdf'];

        if (!allowedExtensions.includes(file.type)) {
            idErr.innerText = 'Error: Invalid file format! Only JPG, PNG, and PDF files are allowed.';
            idErr.style.display = 'block';
            idCardInput.value = '';
            return false;
        }

        if (fileSizeMB > 5) {
            idErr.innerText = 'Error: File size is ' + fileSizeMB.toFixed(2) + 'MB! Maximum allowed limit is 5MB. Please upload a smaller file.';
            idErr.style.display = 'block';
            idCardInput.value = '';
            return false;
        }
    }
    return true;
}

function handleStudentStatusChange() {
    var isEiilmYes = document.getElementById('eiilmYes').checked;
    var isEiilmNo = document.getElementById('eiilmNo').checked;

    var studentFields = document.getElementById('eiilmStudentFields');
    var nonStudentBlock = document.getElementById('nonStudentBlock');
    var checkErr = document.getElementById('eiilmCheckErr');

    if (checkErr) checkErr.style.display = 'none';

    if (isEiilmYes) {
        studentFields.style.display = 'block';
        nonStudentBlock.style.display = 'none';
    } else if (isEiilmNo) {
        studentFields.style.display = 'none';
        nonStudentBlock.style.display = 'block';
    }
}

function handleVolunteerSubmit(event) {
    if (event) event.preventDefault();

    var isEiilmYes = document.getElementById('eiilmYes').checked;
    var isEiilmNo = document.getElementById('eiilmNo').checked;

    // Reset error displays
    var errorElements = document.querySelectorAll('#volunteerForm .text-danger');
    errorElements.forEach(function (elem) {
        if (elem.id.endsWith('Err')) {
            elem.style.display = 'none';
        }
    });

    if (!isEiilmYes && !isEiilmNo) {
        document.getElementById('eiilmCheckErr').style.display = 'block';
        return false;
    }

    if (isEiilmNo) {
        alert('Volunteer registration is exclusively reserved for current EIILM Kolkata students. You can support our cause by donating.');
        return false;
    }

    // Form Validation Logic
    var isValid = true;
    var name = document.getElementById('volName').value.trim();
    var phone = document.getElementById('volPhone').value.trim();
    var email = document.getElementById('volEmail').value.trim();
    var address = document.getElementById('volAddress').value.trim();
    var dept = document.getElementById('volDepartment').value;
    var roll = document.getElementById('volRollNo').value.trim();
    var region = document.getElementById('volRegion').value;
    var branch = document.getElementById('volBranch').value;
    var idCardInput = document.getElementById('volIdCard');
    var declaration = document.getElementById('declarationCheck').checked;

    if (!name) { document.getElementById('volNameErr').style.display = 'block'; isValid = false; }
    if (!phone || phone.length !== 10) { document.getElementById('volPhoneErr').style.display = 'block'; isValid = false; }
    if (!email || !email.includes('@')) { document.getElementById('volEmailErr').style.display = 'block'; isValid = false; }
    if (!address) { document.getElementById('volAddressErr').style.display = 'block'; isValid = false; }
    if (!dept) { document.getElementById('volDeptErr').style.display = 'block'; isValid = false; }
    if (!roll) { document.getElementById('volRollErr').style.display = 'block'; isValid = false; }
    if (!region) { document.getElementById('volRegionErr').style.display = 'block'; isValid = false; }
    if (!branch) { document.getElementById('volBranchErr').style.display = 'block'; isValid = false; }

    // File Validation
    if (idCardInput.files.length === 0) {
        document.getElementById('volIdErr').innerText = 'Error: Please select and upload your College ID Card document (Max 5MB).';
        document.getElementById('volIdErr').style.display = 'block';
        isValid = false;
    } else {
        var file = idCardInput.files[0];
        var fileSizeMB = file.size / (1024 * 1024);
        var allowedExtensions = ['image/jpeg', 'image/png', 'application/pdf'];

        if (!allowedExtensions.includes(file.type)) {
            document.getElementById('volIdErr').innerText = 'Error: Invalid file format! Please upload only JPG, PNG, or PDF.';
            document.getElementById('volIdErr').style.display = 'block';
            isValid = false;
        } else if (fileSizeMB > 5) {
            document.getElementById('volIdErr').innerText = 'Error: File size exceeds 5MB! Please upload a file under 5MB.';
            document.getElementById('volIdErr').style.display = 'block';
            isValid = false;
        }
    }

    if (!declaration) {
        document.getElementById('declarationErr').style.display = 'block';
        isValid = false;
    }

    if (!isValid) return false;

    // Successful Submission Notice
    alert('Application Submitted Successfully!\n\nStatus: PENDING VERIFICATION\n\nYour application for preferred branch "' + branch + '" and College ID proof have been received. We will verify your details with EIILM Kolkata administration and contact you soon.');

    document.getElementById('volunteerForm').reset();
    document.getElementById('volBranch').disabled = true;
    handleStudentStatusChange();

    return false;
}
// <!-- Partner Logo Click Function -->
  document.addEventListener('DOMContentLoaded', function () {
    var partnerCards = document.querySelectorAll('.partner-card');
    
    partnerCards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        var name = this.getAttribute('data-name');
        var details = this.getAttribute('data-details');
        
        if (name && details) {
          alert("🤝 Corporate Partner: " + name + "\n\n" + details);
        }
      });
    });
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

      // 9. Lifecycle Initialization
      document.addEventListener('DOMContentLoaded', () => {
        toggleDonorFields();
        handleEiilmCheck();
        Fancybox.bind("[data-fancybox]", {});
      });
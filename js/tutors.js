// ===== TUTORS DATA =====
let tutors = JSON.parse(localStorage.getItem('tutors')) || [
    {
        id: 1,
        name: "Dr. Abdur Rahman",
        email: "rahman@tutor.com",
        phone: "01711111111",
        subject: "Math",
        price: 800,
        location: "Dhanmondi",
        qualification: "PhD in Mathematics, DU",
        experience: 8,
        bio: "Experienced math teacher with PhD. Specialize in HSC and Admission tests. 10+ years of teaching experience.",
        avatar: "👨‍🏫",
        rating: 4.5,
        totalRatings: 28,
        reviews: [
            { user: "Rahim", rating: 5, comment: "Excellent teacher! Very clear concepts.", date: "2026-01-15" },
            { user: "Karim", rating: 4, comment: "Good teaching style, helpful.", date: "2026-01-10" }
        ]
    },
    {
        id: 2,
        name: "Ms. Fatema Begum",
        email: "fatema@tutor.com",
        phone: "01822222222",
        subject: "English",
        price: 600,
        location: "Mirpur",
        qualification: "MA in English Literature, JU",
        experience: 5,
        bio: "English literature expert. Help with writing, speaking, and exam preparation.",
        avatar: "👩‍🏫",
        rating: 4.8,
        totalRatings: 15,
        reviews: [
            { user: "Sumaiya", rating: 5, comment: "Best English teacher ever!", date: "2026-01-12" }
        ]
    },
    {
        id: 3,
        name: "Mr. Hasan Mahmud",
        email: "hasan@tutor.com",
        phone: "01933333333",
        subject: "Physics",
        price: 700,
        location: "Uttara",
        qualification: "M.Sc in Physics, BUET",
        experience: 6,
        bio: "Physics made easy. Specialize in Numerical problems and conceptual understanding.",
        avatar: "👨‍🔬",
        rating: 4.2,
        totalRatings: 20,
        reviews: [
            { user: "Tanvir", rating: 4, comment: "Good teacher, explains well.", date: "2026-01-05" }
        ]
    },
    {
        id: 4,
        name: "Mr. Kamal Hossain",
        email: "kamal@tutor.com",
        phone: "01644444444",
        subject: "Chemistry",
        price: 650,
        location: "Mohammadpur",
        qualification: "M.Sc in Chemistry, DU",
        experience: 4,
        bio: "Chemistry concepts explained simply. Help with practicals and organic chemistry.",
        avatar: "🧪",
        rating: 4.0,
        totalRatings: 12,
        reviews: []
    },
    {
        id: 5,
        name: "Ms. Jahanara Akter",
        email: "jahanara@tutor.com",
        phone: "01555555555",
        subject: "Programming",
        price: 1000,
        location: "Banani",
        qualification: "B.Sc in CSE, BUET",
        experience: 3,
        bio: "Teaching Programming, Web Development, and Problem Solving. Worked at Google for 2 years.",
        avatar: "💻",
        rating: 5.0,
        totalRatings: 10,
        reviews: [
            { user: "Shakib", rating: 5, comment: "Amazing teacher! Very patient.", date: "2026-01-18" }
        ]
    }
];

// Current tutor being rated
let currentRatingTutor = null;
let selectedRating = 0;

// ===== INITIALIZE =====
function initTutors() {
    saveTutors();
    displayTutors();
}

// ===== SAVE TO LOCALSTORAGE =====
function saveTutors() {
    localStorage.setItem('tutors', JSON.stringify(tutors));
}

// ===== DISPLAY TUTORS =====
function displayTutors() {
    const container = document.getElementById('tutorsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    tutors.forEach(tutor => {
        const card = createTutorCard(tutor);
        container.appendChild(card);
    });
}

// ===== CREATE TUTOR CARD =====
function createTutorCard(tutor) {
    const card = document.createElement('div');
    card.className = 'tutor-card';
    
    const stars = getStarHTML(tutor.rating);
    
    card.innerHTML = `
        <div class="tutor-header">
            <div class="tutor-avatar">${tutor.avatar}</div>
            <h3>${tutor.name}</h3>
            <p>${tutor.subject} Specialist</p>
        </div>
        <div class="tutor-body">
            <div class="tutor-info">
                <p><i class="fas fa-map-marker-alt"></i> ${tutor.location}</p>
                <p><i class="fas fa-graduation-cap"></i> ${tutor.qualification}</p>
                <p><i class="fas fa-briefcase"></i> ${tutor.experience} years exp.</p>
                <p><i class="fas fa-taka"></i> ৳${tutor.price}/hour</p>
            </div>
            <div class="tutor-rating">
                <span class="stars">${stars}</span>
                <span>(${tutor.totalRatings} reviews)</span>
            </div>
            <div class="tutor-actions">
                <button class="btn-view" onclick="viewTutor(${tutor.id})">
                    <i class="fas fa-eye"></i> View Profile
                </button>
                <button class="btn-rate" onclick="openRatingModal(${tutor.id})">
                    <i class="fas fa-star"></i> Rate
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// ===== GET STAR HTML =====
function getStarHTML(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    return stars;
}

// ===== SEARCH TUTORS =====
function searchTutors() {
    const subject = document.getElementById('searchSubject').value.toLowerCase();
    const location = document.getElementById('searchLocation').value.toLowerCase();
    
    const filtered = tutors.filter(tutor => {
        const matchSubject = !subject || tutor.subject.toLowerCase().includes(subject);
        const matchLocation = !location || tutor.location.toLowerCase().includes(location);
        return matchSubject && matchLocation;
    });
    
    displayFilteredTutors(filtered);
    showToast(`Found ${filtered.length} tutors`, 'info');
}

// ===== FILTER BY SUBJECT (Quick Filters) =====
function filterSubject(subject) {
    document.getElementById('searchSubject').value = subject;
    searchTutors();
}

// ===== FILTER BY SUBJECT DROPDOWN =====
function filterBySubject() {
    const subject = document.getElementById('filterSubject').value;
    if (subject) {
        const filtered = tutors.filter(t => t.subject === subject);
        displayFilteredTutors(filtered);
    } else {
        displayTutors();
    }
}

// ===== SORT TUTORS =====
function sortTutors() {
    const sortBy = document.getElementById('sortBy').value;
    let sorted = [...tutors];
    
    switch(sortBy) {
        case 'rating-high':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'rating-low':
            sorted.sort((a, b) => a.rating - b.rating);
            break;
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        default:
            return;
    }
    
    displayFilteredTutors(sorted);
}

// ===== DISPLAY FILTERED TUTORS =====
function displayFilteredTutors(filteredTutors) {
    const container = document.getElementById('tutorsList');
    container.innerHTML = '';
    
    if (filteredTutors.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; grid-column: 1/-1; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--gold);"></i>
                <h3>No tutors found</h3>
                <p style="color: var(--text-gray);">Try adjusting your filters</p>
            </div>
        `;
        return;
    }
    
    filteredTutors.forEach(tutor => {
        const card = createTutorCard(tutor);
        container.appendChild(card);
    });
}

// ===== ADD NEW TUTOR =====
function addTutor() {
    if (!requireAuth()) {
        // Scroll to login after showing modal
        setTimeout(() => {
            document.getElementById('tutors').scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
    }
    
    const name = document.getElementById('tutorName').value;
    const email = document.getElementById('tutorEmail').value;
    const phone = document.getElementById('tutorPhone').value;
    const subject = document.getElementById('tutorSubject').value;
    const price = document.getElementById('tutorPrice').value;
    const location = document.getElementById('tutorLocation').value;
    const qualification = document.getElementById('tutorQualification').value;
    const experience = document.getElementById('tutorExperience').value;
    const bio = document.getElementById('tutorBio').value;
    
    if (!name || !email || !phone || !subject || !price || !location || !qualification || !experience || !bio) {
        showToast('Please fill all fields', 'error');
        return;
    }
    
    const newTutor = {
        id: tutors.length + 1,
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        price: parseInt(price),
        location: location,
        qualification: qualification,
        experience: parseFloat(experience),
        bio: bio,
        avatar: getRandomAvatar(),
        rating: 0,
        totalRatings: 0,
        reviews: []
    };
    
    tutors.push(newTutor);
    saveTutors();
    displayTutors();
    
    // Clear form
    document.getElementById('tutorForm').reset();
    
    showToast('Tutor added successfully!', 'success');
    
    // Scroll to tutors section
    document.getElementById('tutors').scrollIntoView({ behavior: 'smooth' });
}

// ===== GET RANDOM AVATAR =====
function getRandomAvatar() {
    const avatars = ['👨‍🏫', '👩‍🏫', '👨‍🔬', '👩‍🔬', '👨‍💻', '👩‍💻'];
    return avatars[Math.floor(Math.random() * avatars.length)];
}

// ===== VIEW TUTOR DETAILS =====
function viewTutor(id) {
    const tutor = tutors.find(t => t.id === id);
    if (!tutor) return;
    
    const stars = getStarHTML(tutor.rating);
    
    let reviewsHTML = '';
    if (tutor.reviews.length > 0) {
        reviewsHTML = tutor.reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span class="reviewer-name">${review.user}</span>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="stars">${getStarHTML(review.rating)}</div>
                <p>${review.comment || 'No comment provided'}</p>
            </div>
        `).join('');
    } else {
        reviewsHTML = '<p style="color: var(--text-gray); text-align: center;">No reviews yet</p>';
    }
    
    const detailsHTML = `
        <div class="tutor-details-header">
            <div class="tutor-details-avatar">${tutor.avatar}</div>
            <h2>${tutor.name}</h2>
            <p class="gold-text">${tutor.subject} Specialist</p>
            <div class="stars" style="font-size: 1.2rem;">${stars}</div>
            <p>${tutor.totalRatings} reviews</p>
        </div>
        
        <div class="details-grid">
            <div class="detail-item">
                <strong><i class="fas fa-map-marker-alt"></i> Location</strong>
                <p>${tutor.location}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-graduation-cap"></i> Qualification</strong>
                <p>${tutor.qualification}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-briefcase"></i> Experience</strong>
                <p>${tutor.experience} years</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-taka"></i> Hourly Rate</strong>
                <p>৳${tutor.price}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-envelope"></i> Email</strong>
                <p>${tutor.email}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-phone"></i> Phone</strong>
                <p>${tutor.phone}</p>
            </div>
        </div>
        
        <div class="detail-item" style="margin-bottom: 2rem;">
            <strong><i class="fas fa-comment"></i> About</strong>
            <p style="margin-top: 0.5rem;">${tutor.bio}</p>
        </div>
        
        <div class="reviews-section">
            <h3><i class="fas fa-star"></i> Student Reviews</h3>
            ${reviewsHTML}
        </div>
    `;
    
    document.getElementById('tutorDetails').innerHTML = detailsHTML;
    showModal('tutorModal');
}

// ===== OPEN RATING MODAL =====
function openRatingModal(tutorId) {
    if (!requireAuth()) {
        return;
    }
    
    const tutor = tutors.find(t => t.id === tutorId);
    if (!tutor) return;
    
    currentRatingTutor = tutor;
    selectedRating = 0;
    
    document.getElementById('ratingTutorInfo').innerHTML = `
        <h3>${tutor.name}</h3>
        <p class="gold-text">${tutor.subject} Tutor</p>
        <div class="stars">${getStarHTML(tutor.rating)}</div>
    `;
    
    document.getElementById('ratingValue').textContent = 'Click a star to rate';
    document.getElementById('ratingComment').value = '';
    
    // Reset stars
    const stars = document.querySelectorAll('.star-rating span');
    stars.forEach(star => {
        star.classList.remove('active');
    });
    
    showModal('ratingModal');
}

// ===== SET RATING =====
function setRating(rating) {
    selectedRating = rating;
    
    const stars = document.querySelectorAll('.star-rating span');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    document.getElementById('ratingValue').textContent = `You rated: ${rating} star${rating > 1 ? 's' : ''}`;
}

// ===== SUBMIT RATING =====
function submitRating() {
    if (!currentRatingTutor) {
        showToast('Error: No tutor selected', 'error');
        closeModal('ratingModal');
        return;
    }
    
    if (selectedRating === 0) {
        showToast('Please select a rating', 'error');
        return;
    }
    
    const comment = document.getElementById('ratingComment').value;
    
    // Find tutor index
    const tutorIndex = tutors.findIndex(t => t.id === currentRatingTutor.id);
    if (tutorIndex === -1) return;
    
    // Create review
    const review = {
        user: currentUser ? currentUser.name : 'Anonymous',
        rating: selectedRating,
        comment: comment || 'No comment',
        date: new Date().toISOString().split('T')[0]
    };
    
    // Add review
    tutors[tutorIndex].reviews.push(review);
    
    // Update rating
    const totalRatings = tutors[tutorIndex].totalRatings + 1;
    const totalStars = (tutors[tutorIndex].rating * tutors[tutorIndex].totalRatings) + selectedRating;
    tutors[tutorIndex].rating = totalStars / totalRatings;
    tutors[tutorIndex].totalRatings = totalRatings;
    
    // Save
    saveTutors();
    displayTutors();
    
    showToast('Thank you for your rating!', 'success');
    closeModal('ratingModal');
    
    currentRatingTutor = null;
    selectedRating = 0;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initTutors();
});
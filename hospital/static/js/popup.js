
  function openPopup() {
    document.getElementById('popup').style.display = 'flex';
  }

  function closePopup() {
    document.getElementById('popup').style.display = 'none';
  }



function showPrivacyPolicy() {
  document.getElementById('privacyPopup').style.display = 'flex';
}

function closePrivacyPolicy() {
  document.getElementById('privacyPopup').style.display = 'none';
}




function handleSearch() {
  const searchTerm = document.getElementById('search-input').value.trim();
  if (!searchTerm) {
    alert('Please enter a search term');
    return;
  }

  // Clear previous highlights
  clearHighlights();

  // Search and highlight
  const content = document.getElementById('content') || document.body;
  const regex = new RegExp(searchTerm, 'gi');
  let firstMatch = null;

  function highlightText(node) {
    if (node.nodeType === 3) { // text node
      const match = node.data.match(regex);
      if (match) {
        const span = document.createElement('span');
        span.className = 'highlight';
        const frag = document.createDocumentFragment();

        let lastIndex = 0;
        node.data.replace(regex, (m, i) => {
          // Add text before match
          const before = node.data.slice(lastIndex, i);
          if (before) frag.appendChild(document.createTextNode(before));

          // Add highlighted match
          const mark = document.createElement('span');
          mark.textContent = m;
          mark.className = 'highlight';
          frag.appendChild(mark);

          if (!firstMatch) firstMatch = mark;

          lastIndex = i + m.length;
        });

        // Add remaining text after last match
        const after = node.data.slice(lastIndex);
        if (after) frag.appendChild(document.createTextNode(after));

        node.parentNode.replaceChild(frag, node);
      }
    } else if (node.nodeType === 1 && node.childNodes && !['SCRIPT','STYLE'].includes(node.tagName)) {
      // recursively process child nodes, but skip script/style tags
      for (let i = 0; i < node.childNodes.length; i++) {
        highlightText(node.childNodes[i]);
      }
    }
  }

  highlightText(content);

  if (firstMatch) {
    firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstMatch.style.backgroundColor = 'yellow';  // Additional highlight
  } else {
    alert('No matches found');
  }
}

function clearHighlights() {
  const highlights = document.querySelectorAll('.highlight');
  highlights.forEach(el => {
    const parent = el.parentNode;
    parent.replaceChild(document.createTextNode(el.textContent), el);
    parent.normalize(); // merge adjacent text nodes
  });
}




function performSearch() {
  const input = document.getElementById('searchInput').value.trim().toLowerCase();
  const searchMap = {
    "home": "Welcome to Rite Surgery, your one-stop destination for trusted and affordable surgical care.",
    "surgery": "Explore advanced surgical procedures like Piles, Hernia, Kidney Stone, and more by top surgeons.",
    "laboratory investigation": "We offer 60+ lab tests with home sample collection and fast reports.",
    "scan": "Affordable diagnostic scans with top-quality imaging and quick reports.",
    "about us": "Rite Surgery is committed to affordable, quality healthcare through expert doctors and trusted hospitals.",
    "ayushman": "Get your treatments covered under Ayushman Bharat scheme. We help with approval and process.",

    "piles": "Minimally invasive treatment for hemorrhoids with fast recovery and less pain.",
    "fissure": "Advanced laser treatment for anal fissures ensures better comfort and healing.",
    "fistula": "Fistula surgeries are done by experienced specialists using the latest techniques.",
    "hernia": "Laparoscopic hernia repair ensures less scarring and faster healing.",
    "appendicitis": "Appendix removal done laparoscopically ensures a quicker recovery.",
    "gallbladder stone": "Safe gallbladder stone removal surgery with minimal discomfort.",
    "kidney stone": "We offer laser-based kidney stone removal for fast, effective relief.",
    "circumcision": "Painless stapler circumcision done under local anesthesia.",
    "stapler circumcision": "Stapler technique provides cleaner results and faster recovery.",
    "hydrocele": "Hydrocele surgery is a simple day-care procedure with high success rate.",
    "frenuloplasty": "Frenuloplasty corrects tight frenulum and improves comfort.",
    "prostate enlargement": "Prostate surgery is available with best urologists and cashless facility.",
    "genitourinary fistula": "Reconstructive urology treatment available by top specialists.",
    "hip replacement": "Hip joint replacement restores mobility and reduces chronic pain.",
    "knee replacement": "Robotic knee replacement for arthritis with fast rehab.",
    "acl tear": "ACL reconstruction with modern techniques ensures joint stability.",
    "disc injury": "Spine and disc surgeries are available with advanced OT setup.",
    "joint replacement": "All types of joint replacements available by senior surgeons.",
    "knee arthroscopy": "Arthroscopy helps diagnose and treat knee issues effectively.",
    "rotator cuff repair": "Shoulder procedures done arthroscopically for less downtime.",
    "cataract": "Laser-assisted cataract surgery for clear vision in minutes.",
    "lasik surgery": "Vision correction with bladeless LASIK in one sitting.",
    "varicose vein": "Laser varicose vein surgery for painless and scarless recovery.",
    "varicocele": "Microsurgical varicocele repair for fertility improvement.",
    "deep vein thrombosis (dvt)": "Get expert help for DVT using advanced medical and surgical care."
  };

  const popup = document.getElementById("searchPopup");
  const title = document.getElementById("popupTitle");
  const desc = document.getElementById("popupDescription");
  const foundKey = Object.keys(searchMap).find(k => k === input);

  if (foundKey) {
    title.innerText = capitalizeEachWord(foundKey);
    desc.innerText = searchMap[foundKey];
    popup.style.display = "block";

    document.getElementById("popupConsult").onclick = () => {
      closePopup();
      document.getElementById("consultationForm").scrollIntoView({ behavior: "smooth" });
    };
  } else {
    title.innerText = "Not Found";
    desc.innerHTML = `The service you searched for was not found.<br><br><strong>Try:</strong> Surgery, Laboratory Investigation, or Scan.`;
    popup.style.display = "block";

    document.getElementById("popupConsult").onclick = () => {
      closePopup();
      document.getElementById("consultationForm").scrollIntoView({ behavior: "smooth" });
    };
  }
}

function closePopup() {
  document.getElementById("searchPopup").style.display = "none";
}

function capitalizeEachWord(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}





document.getElementById('searchModal').style.display = 'block';

const bookBtn = document.querySelector('#searchModal button');
bookBtn.onclick = () => {
  document.getElementById('searchModal').style.display = 'none';
  document.getElementById('consultationForm').scrollIntoView({ behavior: 'smooth' });
};

  function openMailClient() {
    const userEmail = document.getElementById("userEmail").value.trim();
    
    if (userEmail === "") {
      alert("Please enter your email address.");
      return;
    }

    // Compose mailto link
    const subject = encodeURIComponent("Query from Rite Surgery Website");
    const body = encodeURIComponent(`Hi Rite Surgery Team,\n\nI have a query regarding your services. Please get in touch with me at: ${userEmail}\n\nThank you!`);
    
    // Open user's email client
    window.location.href = `mailto:ritesurgery@gmail.com?subject=${subject}&body=${body}`;
  }

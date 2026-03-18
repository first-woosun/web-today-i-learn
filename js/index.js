// TODO: TIL 폼 등록 기능을 구현하세요
// 1. 폼 요소와 목록 요소를 querySelector로 선택합니다.
// 2. 폼의 submit 이벤트를 감지하여 새 TIL 항목을 목록에 추가합니다.

const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");

// 로컬 스토리지 키
const TIL_STORAGE_KEY = 'tilItems';

// TIL 항목들을 로컬 스토리지에서 불러오기
function loadTILItems() {
  const items = JSON.parse(localStorage.getItem(TIL_STORAGE_KEY)) || [];
  return items;
}

// TIL 항목들을 로컬 스토리지에 저장하기
function saveTILItems(items) {
  localStorage.setItem(TIL_STORAGE_KEY, JSON.stringify(items));
}

// TIL 항목을 HTML로 렌더링
function renderTILItem(item, index) {
  const article = document.createElement('article');
  article.className = 'til-item';

  const time = document.createElement('time');
  time.textContent = item.date;

  const h3 = document.createElement('h3');
  h3.textContent = item.title;

  const p = document.createElement('p');
  p.textContent = item.content;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '삭제';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => deleteTILItem(index));

  article.appendChild(time);
  article.appendChild(h3);
  article.appendChild(p);
  article.appendChild(deleteBtn);

  return article;
}

// TIL 목록을 화면에 표시
function displayTILItems() {
  const items = loadTILItems();
  tilList.innerHTML = ''; // 기존 목록 비우기

  items.forEach((item, index) => {
    const article = renderTILItem(item, index);
    tilList.appendChild(article);
  });
}

// 새 TIL 항목 추가
function addTILItem(date, title, content) {
  const items = loadTILItems();
  const newItem = { date, title, content };
  items.push(newItem);
  saveTILItems(items);
  displayTILItems();
}

// TIL 항목 삭제
function deleteTILItem(index) {
  const items = loadTILItems();
  items.splice(index, 1);
  saveTILItems(items);
  displayTILItems();
}

// 폼 제출 이벤트 처리
tilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const date = document.querySelector("#til-date").value;
  const title = document.querySelector("#til-title").value;
  const content = document.querySelector("#til-content").value;

  if (date && title && content) {
    addTILItem(date, title, content);
    tilForm.reset(); // 폼 초기화
  }
});

// 페이지 로드 시 TIL 목록 표시
document.addEventListener('DOMContentLoaded', displayTILItems);

// 다크 모드 토글 기능
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  darkModeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('darkMode', isDark);
});

// 페이지 로드 시 다크 모드 상태 복원
document.addEventListener('DOMContentLoaded', () => {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }
  displayTILItems();
});

// 갤러리 모달 기능
const modal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-image');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = 'block';
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// 네비게이션 스크롤 애니메이션
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

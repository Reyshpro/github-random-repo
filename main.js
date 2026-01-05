const selector = document.querySelector('.languageSelector');
const text = document.querySelector('.text');
const button = document.querySelector('.refresh-btn');
const result= document.querySelector('.result');

function truncateText(text, maxLength = 120) {
  if (!text) return 'No description available.';
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + '...';
}

async function getRandomRepo(language) {
  text.textContent = 'Loading, please wait...';

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`
    );
    if (!response.ok) {
      throw new Error('HTTP error');
}
    const data = await response.json();
    const repos = data.items;

    // empty result FIRST
    if (repos.length === 0) {
      text.textContent = 'No repositories found.';
      button.style.display = 'none'; 
      result.style.backgroundColor = '';
      return;
    }

    // then pick random
    const randomIndex = Math.floor(Math.random() * repos.length);
    const repo = repos[randomIndex];
   
    result.style.backgroundColor = '';
    button.innerHTML = 'Refresh';
    button.style.backgroundColor = '';

text.innerHTML = `
  <div class="repo-card">
    <h4 class="repo-name">
      <a href="${repo.html_url}" target="_blank">
        ${repo.name}
      </a>
    </h4>
    
<p class="repo-desc">
  ${truncateText(repo.description)}
  <a
    href="${repo.html_url}"
    target="_blank"
    class="read-more"
  >
    Read more
  </a>
</p>

    <div class="repo-stats">
      <span>⭐ ${repo.stargazers_count}</span>
      <span>🍴 ${repo.forks_count}</span>
      <span>🐞 ${repo.open_issues_count}</span>
    </div>
  </div>
`;

  button.style.display = 'inline-block';

  } catch (error) {
    text.textContent = 'Something went wrong. Please try again.';
    result.style.backgroundColor = 'rgb(254, 226, 226)';

    button.innerHTML='Click to retry';
    button.style.backgroundColor='rgba(253, 87, 87, 1)'

    console.error(error);
  }
}

selector.addEventListener('change', () => {
  const selectedLanguage = selector.value;
  getRandomRepo(selectedLanguage);
});

button.addEventListener("click" , ()=>{
  const selectedLanguage = selector.value;
  getRandomRepo(selectedLanguage);
})


const GITHUB_API_URL = 'https://api.github.com/users';
const MY_TOKEN = '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'


async function getUsers(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `token${MY_TOKEN}`
            }
        })

        const data = await response.json()
        return data;



    } catch (error) {
        console.log(error);
    }
}

const userData = document.querySelector('.userData')

async function renderUsers() {
    const users = await getUsers(GITHUB_API_URL);
    renderData(users)

}

renderUsers()

function renderData(users){
    users.forEach((user) => {
        const fragment = new DocumentFragment()

        const card = document.createElement('div')

        const image = document.createElement('img')
        image.src = user.avatar_url ? user.avatar_url: user.owner.avatar_url
        
        const userName = document.createElement('h2')
        userName.textContent = user.login ? user.login: user.owner.login

        
        
        fragment.appendChild(image)
        fragment.appendChild(userName)

        card.appendChild(fragment)

        userData.appendChild(card)
    })
}

const searchInput = document.querySelector('.searchInput')

const btn = document.querySelector('.btn')


async function searchUsers(searchValue){
    const user = await getUsers(`https://api.github.com/search/repositories?q=${searchValue}`)

    userData.innerHTML = ""

    console.log(user.items);

    renderData(user.items);
}

btn.addEventListener('click', () => {
    searchUsers(searchInput.value.trim())
})
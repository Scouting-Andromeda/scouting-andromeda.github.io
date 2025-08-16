const header = {
	center: [
		{name: "Algemene info", id: "submenu_algemeen", children: [
			{name: "Privacystatement", url: "/privacy"},
			{name: "Sociale veiligheid", url: "/sociale-veiligheid"}
		]},
		// {name: "Nieuws", url: "/nieuws"},
		{name: "Speltakken", id: "submenu_speltakken", children: [
			{name: "Welpen", url: "/speltakken/welpen"},
			{name: "Scouts", url: "/speltakken/scouts"},
			{name: "Explorers", url: "/speltakken/explorers"},
			{name: "Stam", url: "/speltakken/stam"}
		]},
		{name: "Contact", url: "/contact"},
		{name: "Verhuur", url: "/verhuur", children: [
			{name: "Foto's", url: "/verhuur/fotos"}
		]},
		{name: "Vacatures", url: "/vacatures"}
	],
	right: [
		{title: "Facebookpagina Scouting Andromeda", url: "https://www.facebook.com/ScoutingAndromeda", content: '<svg width="20px" height="20px" viewBox="0 0 20 20" aria-hidden="true"><path d="M20,10.1c0-5.5-4.5-10-10-10S0,4.5,0,10.1c0,5,3.7,9.1,8.4,9.9v-7H5.9v-2.9h2.5V7.9C8.4,5.4,9.9,4,12.2,4c1.1,0,2.2,0.2,2.2,0.2v2.5h-1.3c-1.2,0-1.6,0.8-1.6,1.6v1.9h2.8L13.9,13h-2.3v7C16.3,19.2,20,15.1,20,10.1z"></path></svg>'},
		{title: "Instagram Scouting Andromeda", url: "https://www.instagram.com/scoutingandromeda", content: '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.3"></circle><path d="M14.2,0H5.8C2.6,0,0,2.6,0,5.8v8.3C0,17.4,2.6,20,5.8,20h8.3c3.2,0,5.8-2.6,5.8-5.8V5.8C20,2.6,17.4,0,14.2,0zM10,15c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S12.8,15,10,15z M15.8,5C15.4,5,15,4.6,15,4.2s0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8S16.3,5,15.8,5z"></path></svg>'}
	]
}

let $ = query => document.querySelector(query);

function setup_header() {
	// Logo met link naar homepage
	let header_div = $('#header')
	let home_a = document.createElement('a')
	home_a.href = "/"
	home_a.title = "Homepage"
	home_a.id = "home_link"
	let home_img = document.createElement('img')
	home_img.src = "/img/Andromeda.png"
	home_a.appendChild(home_img)
	header_div.appendChild(home_a)

	// Menu-items
	function create_from_list(list) {
		let ul = document.createElement('ul')
		for (const item of list) {
			const is_submenu = 'children' in list
			let li = document.createElement('li')
			let li_content
			if ('url' in item) {
				li_content = document.createElement('a')
				li_content.href = item.url
			} else {
				li_content = document.createElement('span')
			}
			li_content.innerHTML = item.name
			if ('children' in item) {
				li_content.innerHTML += ' &#x25BE;'
				li_content.addEventListener('click',() => {$(`#${item.id}`).classList.toggle('show')})
				li.classList.add('dropdown')
				let sub_ul = create_from_list(item.children)
				sub_ul.id = item.id
				sub_ul.classList.add('submenu')
				li.appendChild(sub_ul)
			} else {
				li_content.innerHTML = item.name
			}
			li.appendChild(li_content)
			ul.appendChild(li)
		}
		return ul
	}
	let ul_1 = document.createElement('ul')
	header_div.appendChild(ul_1)
	let li_1 = document.createElement('li')
	ul_1.appendChild(li_1)
	let ul_2 = create_from_list(header['center'])
	ul_2.classList.add('menu')
	li_1.appendChild(ul_2)

	// Socials
	for (const item of header.right) {
		let li = document.createElement('li')
		let a = document.createElement('a')
		a.href = item.url
		a.title = item.title
		a.innerHTML = item.content
		li.appendChild(a)
		ul_1.appendChild(li)
	}

	// Knop voor dropdownmenu op kleine schermen
	let li_2 = document.createElement('li')
	let button = document.createElement('button')
	button.classList.add('menu-toggle')
	button.addEventListener('click',() => {$('.menu').classList.toggle('show')})
	button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>'
	li_2.appendChild(button)
	ul_1.appendChild(li_2)

}
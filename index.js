document.addEventListener('DOMContentLoaded', function() {
    let myLeads = []
    const inputEl = document.getElementById("input-el")
    const inputBtn = document.getElementById("input-btn")
    const ulEl = document.getElementById("ul-el")
    const deleteBtn = document.getElementById("delete-btn")
    const tabBtn = document.getElementById("tab-btn")

    // Load saved leads
    chrome.storage.local.get(['myLeads'], function(result) {
        myLeads = result.myLeads || []
        render(myLeads)
    })

    tabBtn.addEventListener("click", function() {    
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0] && tabs[0].url) {
                myLeads.push(tabs[0].url)
                saveLeads()
                render(myLeads)
            }
        })
    })

    function render(leads) {
        ulEl.innerHTML = leads.map(lead => 
            `<li>
                <a target='_blank' href='${lead}'>${lead}</a>
            </li>`
        ).join('')
    }

    function saveLeads() {
        chrome.storage.local.set({ myLeads: myLeads })
    }

    deleteBtn.addEventListener("click", function() {
        if (confirm("Are you sure you want to delete all leads?")) {
            myLeads = []
            saveLeads()
            render(myLeads)
        }
    })

    inputBtn.addEventListener("click", function() {
        if (inputEl.value) {
            myLeads.push(inputEl.value)
            inputEl.value = ""
            saveLeads()
            render(myLeads)
        }
    })
})

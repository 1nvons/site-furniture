window.addEventListener("DOMContentLoaded", function() {
    let scriptPath;
    let currentPage = window.location.pathname;
    let scriptEl = document.createElement('script')
    scriptEl.setAttribute("type", "text/javascript")


    if(currentPage === './index.html') {
        scriptPath = "./assets/js/indexpage.min.js"

        scriptEl.setAttribute("src", scriptPath)

        document.getElementsByTagName("body")[0].appendChild(scriptEl)

    }else if(currentPage === './weworks.html') {
        scriptPath = "./assets/js/catalogpage.min.js"
        
        scriptEl.setAttribute("src", scriptPath)

        document.getElementsByTagName("body")[0].appendChild(scriptEl)

    }else if(currentPage === './feedback.html') {
        scriptPath = "./assets/js/feedbackpage.min.js"
        
        scriptEl.setAttribute("src", scriptPath)

        document.getElementsByTagName("body")[0].appendChild(scriptEl)

    }else if(currentPage === './') {
        scriptPath = "./assets/js/indexpage.min.js"

        scriptEl.setAttribute("src", scriptPath)

        document.getElementsByTagName("body")[0].appendChild(scriptEl)
    }
})
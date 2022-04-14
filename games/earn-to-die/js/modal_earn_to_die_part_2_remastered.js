function modal(e) {
    let reminder = false;
    let close_hide = function () {
        if (reminder) {
            try {
                document.body.removeChild(reminder);
            } catch (e) {
            } finally {
                reminder = false;
            }
        }
    };
    if (!e.closed && typeof window.URLSearchParams === 'function' && is_correct_context()) {
        // remind that the game is already installed
        reminder = document.createElement('IFRAME');
        reminder.className = 'reminder-modal-frame';
        reminder.setAttribute('src', chrome.runtime.getURL('/modal.html'));
        if (document.body) {
            document.body.appendChild(reminder);
            // click anywhere to close modal
            document.body.addEventListener('click', function (e) {
                close_hide()
            });
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                document.body.appendChild(reminder);
                // click anywhere to close modal
                document.body.addEventListener('click', function (e) {
                    close_hide()
                });
            });
        }
        chrome.storage.onChanged.addListener(function (changes, namespace) {
            if (!reminder)
                return;
            for (let [key, {newValue}] of Object.entries(changes))
                if ((key === 'closed' && newValue) || key === 'opened') {
                    // click inside iframe will close a modal
                    close_hide()
                }
        });
    } e.game && setTimeout(e.game);
}

function is_correct_context() {
    let searchPar = new URLSearchParams(window.location.search);
    let searchQ = searchPar.get("q") || searchPar.get("p");
    if (!searchQ)
        return false;
    let searchContextAlt = searchPar.get('tbm');
    if (searchContextAlt)
        return false;
    // show modal only on search Earn to Die Part 2 Remastered page
    return searchQ.toLowerCase().indexOf("Earn to Die Part 2 Remastered".toLowerCase()) > -1;

}

chrome.storage.local.get('closed,opened,game'.split(','), modal);

document.addEventListener('DOMContentLoaded', function () {
    // Add anchor links to all headings
    var headers = document.querySelectorAll('article h1[id], article h2[id], article h3[id], article h4[id], article h5[id]')
    headers.forEach((element) => {
        element.insertAdjacentHTML('beforeend', `<a href="#${element.id}" class="hanchor" ariaLabel="Anchor">#</a>`)
    })

    // Add copy buttons to code blocks
    document.querySelectorAll('.highlight').forEach(function (codeBlock) {
        // Create copy button
        var button = document.createElement('button');
        button.className = 'copy-code-button';
        button.type = 'button';
        button.ariaLabel = 'Copy code to clipboard';
        button.title = 'Copy code to clipboard';
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>';

        // Add click handler
        button.addEventListener('click', function () {
            var code = codeBlock.querySelector('code');
            // Get all the span elements that contain individual lines
            var lines = code.querySelectorAll('span[style*="display:flex"]');

            if (lines.length > 0) {
                // Extract text from each line span
                var text = Array.from(lines).map(function (line) {
                    return line.textContent;
                }).join('');
            } else {
                // Fallback for code blocks without flex spans
                var text = code.textContent;
            }

            // Copy to clipboard
            navigator.clipboard.writeText(text).then(function () {
                // Show success feedback
                button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>';
                button.classList.add('copied');

                // Reset after 2 seconds
                setTimeout(function () {
                    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>';
                    button.classList.remove('copied');
                }, 2000);
            }).catch(function (err) {
                console.error('Failed to copy code: ', err);
            });
        });

        // Insert button into the code block
        codeBlock.style.position = 'relative';
        codeBlock.insertBefore(button, codeBlock.firstChild);
    });
});

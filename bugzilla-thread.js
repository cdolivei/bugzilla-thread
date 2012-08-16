(function() {

let comments = document.querySelectorAll(".bz_comment > .bz_comment_text");
let reply_regex = /^\(In reply to(?: .+? from)? comment #(\d+)\)/;
let thread = new Array(comments.length);
let comments_container = document.getElementById("c0").parentNode;

for (let i = 0; i < comments.length; ++i)
{
    let match = reply_regex.exec(comments[i].textContent);
    let comment = comments[i].parentNode
    
    thread[i] = 0;
    if (match !== null)
    {
        let reply_to = parseInt(match[1], 10);
        thread[i] = (thread[reply_to] || 0) + 1;
        comments_container.removeChild(comment)
        comments_container.insertBefore(comment,
                                        comments[reply_to].parentNode.nextElementSibling)

        comment.style.marginLeft = 
            "-moz-calc(" +
            window.getComputedStyle(comment, null).marginLeft +
            " + " + (thread[i] * 2).toString() + "em" +
            ")";
    }
    
}

})()

(function() {

var comments = document.querySelectorAll(".bz_comment > .bz_comment_text");
var reply_regex = /^\(In reply to(?: .+? from)? comment #(\d+)\)/;
var thread = new Array(comments.length);
var comments_container = document.getElementById("c0").parentNode;

for (var i = 0; i < comments.length; ++i)
{
    var match = reply_regex.exec(comments[i].textContent);
    var comment = comments[i].parentNode;
    
    thread[i] = 0;
    if (match !== null)
    {
        var reply_to = parseInt(match[1], 10);
        thread[i] = (thread[reply_to] || 0) + 1;
        comments_container.removeChild(comment);
        comments_container.insertBefore(comment,
                                        comments[reply_to].parentNode.nextElementSibling);

        comment.style.marginLeft = 
            "-moz-calc(" +
            window.getComputedStyle(comment, null).marginLeft +
            " + " + (thread[i] * 2).toString() + "em" +
            ")";
    }
    
}

})()

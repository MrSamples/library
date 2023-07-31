//TODO when deleteBook gets called, I need to loop through the books and update the num.textContent so the numbers aren't wrong (ex: delete book #1 and now book #2 is the first book but it's number still reads "2").
const newBook = document.querySelector(".new-book");
const popup = document.querySelector(".popup");
const close = document.querySelector(".close");
const adder = document.querySelector(".add-book");
const editor = document.querySelector(".edit-book");
const btitle = document.querySelector("#btitle");
const bauthor = document.querySelector("#bauthor");
const bwordcount = document.querySelector("#bwordcount");
const bread = document.querySelector("#bread");

let myLibrary = [];
let c = 1;

class Book {
    constructor(title, author, wordcount, read) {
        this.title = title;
        this.author = author;
        this.wordcount = wordcount;
        this.read = read;
    }

    info() {
        return `${title} by ${author}, ${wordcount} words, read: ${read}`;
    }
}

function saveEdit(e, tmpNum, tmpTitle, tmpAuthor, tmpWordcount, tmpCheck) {
    e.preventDefault();

    myLibrary[parseInt(tmpNum.textContent) - 1].title = btitle.value;
    tmpTitle.textContent = btitle.value;
    myLibrary[parseInt(tmpNum.textContent) - 1].author = bauthor.value;
    tmpAuthor.textContent = bauthor.value;
    myLibrary[parseInt(tmpNum.textContent) - 1].wordcount = bwordcount.value;
    let nu = bwordcount.value;
    for (let i = Math.floor((nu.length - 1) / 3); i > 0; i--) {
        nu = nu.slice(0, (i * -3)) + "," + nu.slice(i * -3);
    }
    tmpWordcount.textContent = nu;
    myLibrary[parseInt(tmpNum.textContent) - 1].read = bread.checked;
    tmpCheck.checked = bread.checked;

    popup.classList.remove("show");
    editor.classList.remove("eshow");

    editor.removeEventListener("click", saveEdit);
}

const tableBody = document.querySelector("tbody");
function printLibrary() {
    for(c; c < (myLibrary.length + 1); c++) {
        const tmpTr = document.createElement("tr");

        const tmpNum = document.createElement("td");
        tmpNum.classList.add("num");
        tmpNum.textContent = c;

        const tmpTitle = document.createElement("td");
        tmpTitle.classList.add("title");
        tmpTitle.textContent = myLibrary[c-1].title;

        const tmpAuthor = document.createElement("td");
        tmpAuthor.classList.add("author");
        tmpAuthor.textContent = myLibrary[c-1].author;

        const tmpWordcount = document.createElement("td");
        tmpWordcount.classList.add("wordcount");

        let n = myLibrary[c-1].wordcount;
        for (let i = Math.floor((n.length - 1) / 3); i > 0; i--) {
            n = n.slice(0, (i * -3)) + "," + n.slice(i * -3);
        }
        tmpWordcount.textContent = n;

        const tmpRead = document.createElement("td");
        tmpRead.classList.add("read");

        const tmpCheck = document.createElement("input");
        tmpCheck.setAttribute("type", "checkbox");
        tmpCheck.checked = myLibrary[c-1].read;
        tmpCheck.disabled = true;

        tmpRead.appendChild(tmpCheck);

        const tmpButtons = document.createElement("td");
        tmpButtons.classList.add("buttons");

        const tmpEdit = document.createElement("button");
        tmpEdit.textContent = "edit";
        tmpEdit.addEventListener("click", function () {
            popup.classList.add("show");
            editor.classList.add("eshow");
            btitle.value = myLibrary[parseInt(tmpNum.textContent) - 1].title;
            bauthor.value = myLibrary[parseInt(tmpNum.textContent) - 1].author;
            bwordcount.value = myLibrary[parseInt(tmpNum.textContent) - 1].wordcount;
            bread.checked = myLibrary[parseInt(tmpNum.textContent) - 1].read;
            editor.addEventListener("click", function (e) { saveEdit(e, tmpNum, tmpTitle, tmpAuthor, tmpWordcount, tmpCheck); });
        });
        const tmpDelete = document.createElement("button");
        tmpDelete.textContent = "delete";
        tmpDelete.addEventListener("click", function () { deleteBook(parseInt(tmpNum.textContent)); });

        tmpButtons.appendChild(tmpEdit);
        tmpButtons.appendChild(document.createTextNode(" "));
        tmpButtons.appendChild(tmpDelete);

        tmpTr.appendChild(tmpNum);
        tmpTr.appendChild(tmpTitle);
        tmpTr.appendChild(tmpAuthor);
        tmpTr.appendChild(tmpWordcount);
        tmpTr.appendChild(tmpRead);
        tmpTr.appendChild(tmpButtons);

        tableBody.appendChild(tmpTr);
    }
}

function addBook(title, author, wordcount, read) {
    myLibrary.push(new Book(title, author, wordcount, read));
}

function deleteBook(num) {
    const books = document.querySelectorAll("tbody tr");
    myLibrary.splice(num - 1, 1);
    books[num - 1].remove();
    c--;

    const nums = document.querySelectorAll("tbody tr .num");
    for (let i = 1; i < books.length; i++) {
        if (i != nums[i-1].textContent)
            nums[i-1].textContent = i.toString();
    }
}

addBook("Hobbit, The", "Tolkien, J.R.R.", "95356", true);
addBook("Game of Thrones, A", "Martin, George R. R.", "292727", false);
printLibrary();

newBook.addEventListener("click", function () {
    popup.classList.add("show");
    adder.classList.add("ashow");
    btitle.value = "";
    bauthor.value = "";
    bwordcount.value = "";
    bread.checked = false;
});
close.addEventListener("click", function () {
    popup.classList.remove("show");
    adder.classList.remove("ashow");
    editor.classList.remove("eshow");
    editor.removeEventListener("click", saveEdit);
});
adder.addEventListener("click", function (e) {
    e.preventDefault();
    addBook(btitle.value, bauthor.value, bwordcount.value, bread.checked);
    btitle.value = "";
    bauthor.value = "";
    bwordcount.value = "";
    bread.checked = false;
    printLibrary();
    popup.classList.remove("show");
    adder.classList.remove("ashow");
});

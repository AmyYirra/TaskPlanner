// Store task
function storebookInLocalStorage(book) {
  // TODO:
  // 1) Declare variable for books array
  let books;
  // 2) Get books out of localstorage and parse into JS array
  // if localstorage is empty, assign books to empty array
  if (localStorage.getItem("books") == null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  // 3) Push our book onto array
  books.push(book);
  // 4) Put new array back into localstorage (parse into string first)
  localStorage.setItem("books", JSON.stringify(books));
  console.log("data added to local storage");
}

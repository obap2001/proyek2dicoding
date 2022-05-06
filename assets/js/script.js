(()=>{
    let listBuku = [];
    function addBuku(event) {
        event.preventDefault();
        const judul = document.querySelector("#inputBookTitle")
        const pengarang = document.querySelector("#inputBookAuthor")
        const tahun = document.querySelector("#inputBookYear")
        const isRead = document.querySelector("#inputBookIsComplete")
        const data = {
            id: +new Date,
            title: judul.value,
            author: pengarang.value,
            year: tahun.value,
            isComplete: isRead.checked
        };
        console.log(data),
        listBuku.push(data),
        document.dispatchEvent(new Event("bookChanged"))
    }
    function searchBuku(event) {
        event.preventDefault();
        const judul = document.querySelector("#searchBookTitle");
        query = judul.value,
        query ? main(listBuku.filter((function(listBuku) {
            return listBuku.title.toLowerCase().includes(query.toLowerCase())
        }
        ))) : main(listBuku)
    }
    function unread(event) {
        if (window.confirm("Are you sure to Mark Read?") == true){
            const index = Number(event.target.id)
            const data = listBuku.findIndex((function(listBuku) {
                return listBuku.id === index
            }
            ));
            -1 !== data && (listBuku[data] = {
                ...listBuku[data],
                isComplete: !0
            },
            document.dispatchEvent(new Event("bookChanged")))
        }
    }
    function read(event) {
        if (window.confirm("Are you sure to Mark Unread?") == true){
            const index = Number(event.target.id)
            const data = listBuku.findIndex((function(listBuku) {
                return listBuku.id === index
            }
            ));
            -1 !== data && (listBuku[data] = {
                ...listBuku[data],
                isComplete: !1
            },
            document.dispatchEvent(new Event("bookChanged")))
        }
    }
    function deleteBuku(event) {
        if (window.confirm("Are you sure want to delete this book?") == true){
            const index = Number(event.target.id)
            const data = listBuku.findIndex((function(listBuku) {
                return listBuku.id === index
            }
            ));
            -1 !== data && (listBuku.splice(data, 1),
            document.dispatchEvent(new Event("bookChanged")))
        }
    }
    // function updateBuku(event){
    //     // const index = Number(event.target.id)
    //     const newTitle = window.prompt("Masukkan Judul Buku: ")
    //     const newAuthor = window.prompt("Masukkan Penulis Buku: ")
    //     const newYear = window.prompt("Masukkan Tahun Buku: ")
    //     let count = 0
    //     for (buku of listBuku){
    //             window.alert("halo");
    //             count++
    //         if (buku.id = event.target.id){
    //             window.alert("masuk");
    //             const newBuku = {
    //                 id: buku.id,
    //                 title: newTitle,
    //                 author: newAuthor,
    //                 year: newYear,
    //                 isComplete: buku.isComplete
    //             }
    //             window.alert(count)
    //             listBuku.splice(count, 1),
    //             // document.dispatchEvent(new Event("bookChanged")),
    //             console.log(newBuku),
    //             listBuku.push(newBuku),
    //             document.dispatchEvent(new Event("bookChanged"))
    //             break;

    //         }
    //     }
    // }
    
    function main(listBuku) {
        const unreadBooks = document.querySelector("#incompleteBookshelfList")
        const readBooks = document.querySelector("#completeBookshelfList")
        // const updatePage = document.querySelector("#updatePage");
        unreadBooks.innerHTML = "",
        readBooks.innerHTML = "";
        for (const buku of listBuku) {
            const listBuku = document.createElement("article");
            listBuku.classList.add("book_item");
            const judul = document.createElement("h2");
            judul.innerText = buku.title;
            const pengarang = document.createElement("p");
            pengarang.innerText = "Penulis: " + buku.author;
            const tahun = document.createElement("p");
            if (tahun.innerText = "Tahun: " + buku.year,
            listBuku.appendChild(judul),
            listBuku.appendChild(pengarang),
            listBuku.appendChild(tahun),
            buku.isComplete) {
                const container = document.createElement("div");
                container.classList.add("action");
                const tombolSelesai = document.createElement("button");
                tombolSelesai.id = buku.id,
                tombolSelesai.innerText = "Mark Unread",
                tombolSelesai.classList.add("green"),
                tombolSelesai.addEventListener("click", read);
                const tombolDelete = document.createElement("button");
                tombolDelete.id = buku.id,
                tombolDelete.innerText = "Delete",
                tombolDelete.classList.add("red"),
                tombolDelete.addEventListener("click", deleteBuku);
                const tombolUpdate = document.createElement("button");
                tombolUpdate.id = buku.id,
                tombolUpdate.innerText = "Update",
                tombolUpdate.classList.add("yellow"),
                // tombolUpdate.addEventListener("click", updateBuku),
                container.appendChild(tombolSelesai),
                container.appendChild(tombolDelete),
                container.appendChild(tombolUpdate)
                listBuku.appendChild(container),
                readBooks.appendChild(listBuku)
            } else {
                const container1 = document.createElement("div");
                container1.classList.add("action");
                const selesaibtn = document.createElement("button");
                selesaibtn.id = buku.id,
                selesaibtn.innerText = "Mark Read",
                selesaibtn.classList.add("green"),
                selesaibtn.addEventListener("click", unread);
                const deletebtn = document.createElement("button");
                deletebtn.id = buku.id,
                deletebtn.innerText = "Delete",
                deletebtn.classList.add("red"),
                deletebtn.addEventListener("click", deleteBuku);
                const updatebtn = document.createElement("button");
                updatebtn.id = buku.id,
                updatebtn.innerText = "Update",
                updatebtn.classList.add("yellow"),
                // updatebtn.addEventListener("click", updateBuku),
                container1.appendChild(selesaibtn),
                container1.appendChild(deletebtn),
                container1.appendChild(updatebtn),
                listBuku.appendChild(container1),
                unreadBooks.appendChild(listBuku)
            }
        }
    }
    function saveData() {
        !function(listBuku) {
            localStorage.setItem("books", JSON.stringify(listBuku))
        }(listBuku),
        main(listBuku)
    }
    window.addEventListener("load", (function() {
        listBuku = JSON.parse(localStorage.getItem("books")) || [],
        main(listBuku);
        const input = document.querySelector("#inputBook")
        const search = document.querySelector("#searchBook");
        input.addEventListener("submit", addBuku),
        search.addEventListener("submit", searchBuku),
        document.addEventListener("bookChanged", saveData)
    }
    ))
}
)();

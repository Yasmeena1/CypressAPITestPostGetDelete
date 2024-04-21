describe('APITesting', () => {

    let RandomIsbn = Math.floor(Math.random() * 2345678)
    let Randomaisle = Math.floor(Math.random() * 2456773)

    const names = [
        "Liam", "Emma", "Noah", "Olivia", "William", "Ava", "James", "Isabella", "Oliver", "Sophia",
        "Benjamin", "Charlotte", "Elijah", "Mia", "Lucas", "Amelia", "Mason", "Harper", "Logan", "Evelyn",
        "Alexander", "Abigail", "Henry", "Emily", "Jacob", "Elizabeth", "Michael", "Mila", "Ethan", "Ella",
        "Daniel", "Avery", "Matthew", "Sofia", "Jackson", "Camila", "Sebastian", "Aria", "Jack", "Scarlett",
        "Luke", "Victoria", "Joseph", "Madison", "David", "Luna", "Samuel", "Grace", "John", "Chloe"
    ];

    const authorNames = [
        "Jane Austen", "William Shakespeare", "George Orwell", "J.K. Rowling", "Stephen King",
        "Agatha Christie", "Mark Twain", "Charles Dickens", "Harper Lee", "J.R.R. Tolkien",
        "F. Scott Fitzgerald", "Leo Tolstoy", "Ernest Hemingway", "Emily Dickinson", "Virginia Woolf",
        "Gabriel García Márquez", "John Steinbeck", "Hermann Hesse", "Toni Morrison", "Margaret Atwood"
    ];
    
    let RandomName=Math.floor(Math.random()*names.length)
    let Randomauther=Math.floor(Math.random()*authorNames.length)

    it('Test Post Request', () => {
        let baseurl = "https://rahulshettyacademy.com/Library/Addbook.php"


        let requestbody = {
            name: names[RandomName],
            isbn: RandomIsbn,
            aisle: Randomaisle,
            author:authorNames[Randomauther]
        }

        cy.request({
                method: "POST",
                url: baseurl,
                body: requestbody
            })
            .then((response) => {
                cy.log(response.body)
                expect(response.status).to.eq(200)
                // expect(response.body.msg).to.eq("Book Already Exists")
            })
    });
    it('test get request', () => {

        let Baseurl = `https://rahulshettyacademy.com/Library/GetBook.php?ID=${RandomIsbn}${Randomaisle}`

        cy.request({

            method: "GET",
            url: Baseurl,
        }).then((response) => {
            cy.log(response.body[0].author)
            expect(response.status).to.eq(200)
            expect(response.body[0].author).to.eq(authorNames[Randomauther])

        })
       
    });
    it('Test Delete Request', () => {
        let requestbody = {
            ID: `${RandomIsbn}${Randomaisle}`
        }
        let BASEURL = "https://rahulshettyacademy.com/Library/DeleteBook.php"

        cy.request({
                method: "DELETE",
                url: BASEURL,
                body: requestbody
            })
            .then((response) => {
                cy.log(response)
                expect(response.status).to.eq(200)
                expect(response.body.msg).to.eq("book is successfully deleted")
            })

    });
 it('test get request for non existed book', () => {

        let Baseurl = `https://rahulshettyacademy.com/Library/GetBook.php?ID=${RandomIsbn}${Randomaisle}`

        cy.request({

            method: "GET",
            url: Baseurl,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body.msg).to.eq("The book by requested bookid / author name does not exists!")

        })
       
    });

});
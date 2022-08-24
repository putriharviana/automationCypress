describe("Dashboard Page Test Cases", ()=> {
    it("Visit login page", () => {
        cy.visit("https://taufanfadhilah.github.io/react-gallery/");
        cy.title().should("eq", "React Gallery"); //title should get string with name "React Gallery"
        cy.contains("Hello Again!");
    })

    it("Do login with correct value", () => {
        const email = cy.get("input[name='email']");
        email.type("user@react.test");
        
        const password = cy.get("input[name='password']");
        password.type("password");
        
        const button = cy.get("button").should("have.attr", "type", "submit");
        button.click();
        
        cy.on("window:alert", (text) => {
            expect(text).to.contains("welcome");
        })

        cy.url().should("eq", "https://taufanfadhilah.github.io/react-gallery/dashboard");
    })

    it("Found no post for the first time", ()=> {
        cy.contains("Found 0 photos");
    })

    it("Contains image url and description input, and publish button", ()=> {
        const imageUrl = cy.get("input[name='image']");
        imageUrl.should("be.visible");
        imageUrl.should("have.attr", "type", "url");
        imageUrl.should("have.attr", "required", "required");
        imageUrl.should("have.attr", "placeholder", "Image URL");

        const description = cy.get("input[name='desc']");
        description.should("be.visible");
        description.should("have.attr", "type", "text");
        description.should("have.attr", "required", "required");
        description.should("have.attr", "placeholder", "What's on your mind?");

        const button = cy.get("button").should("have.attr", "type", "submit");
        button.should("be.visible");
        button.contains("Publish!");
        button.should("have.css", "background-color", "rgb(79, 70, 229)")
    })

    it("Upload some photos(1)", ()=> {
        cy.request('https://jsonplaceholder.typicode.com/photos?albumId=1').then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body)

            response.body.forEach(({url, title})=> {
                const imageUrl = cy.get("input[name='image']");
                imageUrl.type(url);

                const description = cy.get("input[name='desc']");
                description.type(title);
                
                const button = cy.get("button").should("have.attr", "type", "submit");
                button.click();

                cy.get("img").should("have.attr", "src", url);
                cy.contains(title);
            })
        })
    })

    it("Upload some photos(2)", ()=> {
        const photos = [
            {
                imageValue:
                    "https://images.unsplash.com/photo-1660092627183-8963c9c985c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
                descriptionValue: "Image 1 : Lorem Ipsum",
            },
            {
                imageValue:
                    "https://images.unsplash.com/photo-1660065079192-71368822b175?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
                descriptionValue: "Image 2 : Lorem Ipsum",
            }
        ];
        
        photos.forEach(({imageValue, descriptionValue})=> {
            const imageUrl = cy.get("input[name='image']");
            imageUrl.type(imageValue);

            const description = cy.get("input[name='desc']");
            description.type(descriptionValue);
            
            const button = cy.get("button").should("have.attr", "type", "submit");
            button.click();

            cy.get("img").should("have.attr", "src", imageValue);
            cy.contains(descriptionValue);
        })
    })

    it("Upload some photos(3)", ()=> {
        cy.request('https://randomuser.me/api/?results=4').then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body.results)
            
            const photos = response.body.results.map( resultImage => ({
                imageValue: resultImage.picture.large,
                descriptionValue: `${ resultImage.name.first } ${ resultImage.name.last }`
            }));
            
            photos.forEach(({imageValue, descriptionValue})=> {
                const imageUrl = cy.get("input[name='image']");
                imageUrl.type(imageValue);

                const description = cy.get("input[name='desc']");
                description.type(descriptionValue);
                
                const button = cy.get("button").should("have.attr", "type", "submit");
                button.click();

                cy.get("img").should("have.attr", "src", imageValue);
                cy.contains(descriptionValue);
            })
        })
    })
})
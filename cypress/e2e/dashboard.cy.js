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

    it("Upload some photos", ()=> {
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
        
        cy.request('https://randomuser.me/api/?results=4').then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body.results)
            
            response.body.results.forEach(({name, picture})=> {
                const imageUrl = cy.get("input[name='image']");
                imageUrl.type(picture.large);

                const description = cy.get("input[name='desc']");
                description.type(name.title + ' ' + name.first + ' ' + name.last);
                
                const button = cy.get("button").should("have.attr", "type", "submit");
                button.click();

                cy.get("img").should("have.attr", "src", picture.large);
                cy.contains(name.title + ' ' + name.first + ' ' + name.last);
            })
            
            cy.contains(`Found ${response.body.results.length} photos`); //String "Found x photos"
        })
    })
})
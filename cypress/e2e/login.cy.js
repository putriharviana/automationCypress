describe ("Login page test cases", () => {
    it("Visit login page", () => {
        cy.visit("https://taufanfadhilah.github.io/react-gallery/");
        cy.title().should("eq", "React Gallery"); //title should get string with name "React Gallery"
        cy.contains("Hello Again!");
    })

    it("Contains Email and Password input and login button", () =>{
        const email = cy.get("input[name='email']");
        email.should("be.visible");
        email.should("have.attr", "type", "email");
        email.should("have.attr", "placeholder", "Email Address");

        const password = cy.get("input[name='password']");
        password.should("be.visible");
        password.should("have.attr", "type", "password");
        password.should("have.attr", "placeholder", "Password");

        const button = cy.get("button").should("have.attr", "type", "submit");
        button.contains("Login");
        button.should("have.css", "background-color", "rgb(79, 70, 229)");
        button.should("have.css", "color", "rgb(255, 255, 255)");
    })

    it("Do login with null value", () => {
        const button = cy.get("button").should("have.attr", "type", "submit");
        button.click();
        cy.on("window:alert", (text) => {
            expect(text).to.contains("login failed");
        })
    })

    it("Do login with wrong value", () => {
        cy.request('https://jsonplaceholder.typicode.com/users/1').then((response) => {
            expect(response.status).to.eq(200)
            console.log(response)
            
            const email = cy.get("input[name='email']");
            email.type(response.body.email);
            
            const password = cy.get("input[name='password']");
            password.type(response.body.address.city);
            
            const button = cy.get("button").should("have.attr", "type", "submit");
            button.click();
            
            cy.on("window:alert", (text) => {
                expect(text).to.contains("login failed");
            })
        })
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
})
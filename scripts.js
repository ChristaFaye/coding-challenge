document.addEventListener("DOMContentLoaded", function () {
    // console.log(`It's working!`);

    const foodFacts = document.getElementById("nutritionFacts");
    const factsBtn = document.getElementById("factsBtn");
    const addBtn = document.getElementById("addBtn");
    const deleteBtn = document.getElementById("deleteBtn");
    const foodCalcu = document.getElementById("foodCalcu");
    const desc = document.getElementById("desc");
    const arrayFood = [];
    const chatText = document.getElementById("chatText");
    const message = document.getElementById("message");
    const answer = document.getElementById("answer");
    
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sendBtn = document.getElementById("sendBtn");

    // trigger fetch function by click event getting nutrition facts
    factsBtn.addEventListener("click", function () {
        getNutritionFacts();
        foodCalcu.style ='padding: 0.8rem;'
        desc.style ='display: none;'
    });

    // trigger add food function
    addBtn.addEventListener("click", function () {
        addFood();
        alert("Food added to your daily calorie count!");
    });

    // refresh page to remove array items
    deleteBtn.addEventListener("click", function () {
        location.reload();
    });

    //chatbot open button
    openBtn.addEventListener("click",  function openForm() {
        document.getElementById("myForm").style.display = "block";
    });

    //chatbot close button
    closeBtn.addEventListener("click",  function closeForm() {
        document.getElementById("myForm").style.display = "none";
    });

    //chatbot send button
     sendBtn.addEventListener("click",  function () {
        postApi(chatText);
        chatText.value = "";
    });

    // function calling fetch api to call get nutrition facts function
    function getNutritionFacts() {
        const inputText = document.getElementById("input").value;
        // console.log(inputText);
         fetch(`https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${inputText}`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "nutrition-by-api-ninjas.p.rapidapi.com",
                "x-rapidapi-key": "5c19919ce6mshdb72b57cccae029p1686bdjsn086cd04caec1"
            },
        })
            .then((response) => response.json())
            .then((obj) => {
                getFoodFacts(obj);
            })
            .catch((err) => {
                alert(`Error: ` + err);
            });
    }

     // function calling fetch api to call Add Food function
     function addFood() {
        
        const inputText = document.getElementById("input").value;
        // console.log(inputText);
         fetch(`https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${inputText}`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "nutrition-by-api-ninjas.p.rapidapi.com",
                "x-rapidapi-key": "5c19919ce6mshdb72b57cccae029p1686bdjsn086cd04caec1"
            },
         })
            .then((response) => response.json())
            .then((obj) => {
                arrayAddFood(obj);
            })
            .catch((err) => {
                alert(`Error:  ` + err);
            });
    }

    // function to integrate data to html
    function getFoodFacts(facts) {
        // console.log(facts);

        // variable for api data
        let foodFact = facts[0];
        let foodName = foodFact.name;
        let serving = foodFact.serving_size_g;
        let calories = foodFact.calories;
        let totalCarb = foodFact.carbohydrates_total_g;
        let saturatedFat = foodFact.fat_saturated_g;
        let totalFat = foodFact.fat_total_g;
        let protein = foodFact.protein_g;
        let fiber = foodFact.fiber_g;
        let cholesterol = foodFact.cholesterol_mg;
        let sodium = foodFact.sodium_mg;
        let sugar = foodFact.sugar_g;
        let potassium = foodFact.potassium_mg;

        // variable for daily intake value based on 2,000 calories data from WHO
        let carbDI = 275;
        let sfatDI = 20;
        let tfatDI = 98;
        let proteinDI = 50;
        let fiberDI = 28;
        let cholesterolDI = 300;
        let sodiumDI = 2300;
        let sugarDI = 50;
        let potassiumDI = 4700;
        
        // computation of daily value percentage
        let carbDV = ((totalCarb/carbDI) * 100).toFixed(2);
        let sfatDV = ((saturatedFat/sfatDI) * 100).toFixed(2);
        let tfatDV = ((totalFat/tfatDI) * 100).toFixed(2);
        let proteinDV = ((protein/proteinDI) * 100).toFixed(2);
        let fiberDV = ((fiber/fiberDI) * 100).toFixed(2);
        let cholesterolDV = ((cholesterol/cholesterolDI) * 100).toFixed(2);
        let sodiumDV = ((sodium/sodiumDI) * 100).toFixed(2);
        let sugarDV = ((sugar/sugarDI) * 100).toFixed(2);
        let potassiumDV = ((potassium/potassiumDI) * 100).toFixed(2);

        foodFacts.innerHTML =  `<h1 id="foodName">${foodName}</h1>
                                <h2 id="totalCalories">Calories: ${calories} calories per ${serving} grams serving</h2>
                               
                                <table id="factsTable">
                                    <tr>
                                        <th>Food Component</th>
                                        <th>Amount</th>
                                        <th>Unit of Measure</th>
                                        <th>Recommended Daily Intake</th>
                                        <th>% Daily Value</th>
                                    </tr>
                                    <tr>
                                        <td>Total Carbohydates</td>
                                        <td>${totalCarb}</td>
                                        <td>grams(g)</td>
                                        <td>${carbDI}</td>
                                        <td>${carbDV}%</td>   
                                    </tr>
                                    <tr>
                                        <td>Saturated Fat</td>
                                        <td>${saturatedFat}</td>
                                        <td>grams(g)</td>
                                        <td>${sfatDI}</td>
                                        <td>${sfatDV}%</td>   
                                    </tr>
                                    <tr>
                                        <td>Total Fat</td>
                                        <td>${totalFat}</td>
                                        <td>grams(g)</td>
                                        <td>${tfatDI}</td>
                                        <td>${tfatDV}%</td>
                                    </tr>
                                    <tr>
                                        <td>Protein</td>
                                        <td>${protein}</td>
                                        <td>grams(g)</td>
                                        <td>${proteinDI}</td>
                                        <td>${proteinDV}%</td>
                                    </tr>
                                    <tr>
                                        <td>Fiber</td>
                                        <td>${fiber}</td>
                                        <td>grams(g)</td>
                                        <td>${fiberDI}</td>
                                        <td>${fiberDV}%</td>
                                    </tr>
                                    <tr>
                                        <td>Cholesterol</td>
                                        <td>${cholesterol}</td>
                                        <td>milligrams(mg)</td>
                                        <td>${cholesterolDI}</td>
                                        <td>${cholesterolDV}%</td>
                                    </tr>
                                    <tr>
                                        <td>Sodium</td>
                                        <td>${sodium}</td>
                                        <td>milligrams(mg)</td>
                                        <td>${sodiumDI}</td>
                                        <td>${sodiumDV}%</td>
                                    </tr>
                                    <tr>
                                        <td>Sugar</td>
                                        <td>${sugar}</td>
                                        <td>grams(g)</td>
                                        <td>${sugarDI}</td>
                                        <td>${sugarDV}%</td>
                                    </tr>
                                    <tr>
                                        <td>Potassium</td>
                                        <td>${potassium}</td>
                                        <td>milligrams(mg)</td>
                                        <td>${potassiumDI}</td>
                                        <td>${potassiumDV}%</td>
                                    </tr>
                                </table>
                                <p id="intake">Recommended Daily Value based on 2,000 calories intake.</p>
                                <p id="legend">% Daily Value: 5% or less is a little, 15% or more is a lot</p>`;
    }



    function arrayAddFood(facts) {
        
         // variable for api data
        let foodFact = facts[0];
        let foodName = foodFact.name;
        let serving = foodFact.serving_size_g;
        let calories = foodFact.calories;
        let sum = 0;
        
        const total = document.getElementById("total");
        const textAdded = document.getElementById("textAdded");
        const listTable = document.getElementById("listTable");

        // Add new row to table whenever new food added on array
        var row = listTable.insertRow(arrayFood.length+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        arrayFood.push([`${foodName}`, `${serving}`, `${calories}`]);

        textAdded.style = "display: block;";
        listTable.style = "display: block;";
        
        cell1.innerHTML = `${foodName}`;
        cell2.innerHTML = `${calories}`;

        // Add calories of each item on array
        for(let i = 0; i < arrayFood.length; i++){
            sum += parseInt(arrayFood[i][2]);
            total.innerHTML = `<h3>Total Calories: ${sum}</h3>`;
        }

        
    }

    function postApi(chatText) {
        var chatMessage = chatText.value;
        console.log(chatMessage);
        const data = `message=hello&language=en&context=%5B%22array%20of%20the%20previous%20messages%22%5D%20`;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                response = JSON.parse(this.responseText);
                message.style = "display: block;"
                message.innerHTML = `<p>${chatMessage}</p>`
                setTimeout(() => {answer.innerHTML =  `<p>${response.message}</p>`}, 500);
                answer.style = "display: block;"
            }
        });

        xhr.open("POST", "https://chatbot19.p.rapidapi.com/chatbot");
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("x-rapidapi-host", "chatbot19.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "09300dae33mshb051cc30284f490p1fbec4jsnd15d572cbbf1");

        xhr.send(data);
    }

});
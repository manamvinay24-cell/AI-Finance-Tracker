// ======================================
// AI FINANCE TRACKER
// PART 1
// ======================================


// ===============================
// GET ELEMENTS
// ===============================

const form = document.getElementById("transactionForm");

const titleInput = document.getElementById("title");

const amountInput = document.getElementById("amount");

const typeInput = document.getElementById("type");

const categoryInput = document.getElementById("category");

const dateInput = document.getElementById("date");


const transactionList =
document.getElementById("transactionList");


// ===============================
// LOCAL STORAGE
// ===============================


let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];



// ===============================
// SAVE DATA
// ===============================

function saveTransactions(){

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}



// ===============================
// ADD TRANSACTION
// ===============================


form.addEventListener("submit",(e)=>{

    e.preventDefault();


    const transaction = {

        id:Date.now(),

        title:titleInput.value,

        amount:Number(amountInput.value),

        type:typeInput.value,

        category:categoryInput.value,

        date:dateInput.value

    };


    transactions.push(transaction);


    saveTransactions();


    renderTransactions();


    form.reset();


});




// ===============================
// DISPLAY TRANSACTIONS
// ===============================


function renderTransactions(){


    transactionList.innerHTML="";


    transactions.forEach((item)=>{


        const li=document.createElement("li");


        li.className=item.type;



        li.innerHTML=`


        <div>

            <h3>${item.title}</h3>

            <p>${item.category}</p>

            <small>${item.date}</small>

        </div>


        <div>

            <h3>

            ${item.type==="income" ? "+" : "-"}

            ₹${item.amount}

            </h3>


            <button onclick="deleteTransaction(${item.id})">

                Delete

            </button>


        </div>


        `;



        transactionList.appendChild(li);



    });


}




// ===============================
// DELETE TRANSACTION
// ===============================


function deleteTransaction(id){


    transactions = transactions.filter(

        (item)=> item.id !== id

    );


    saveTransactions();


    renderTransactions();


}




// ===============================
// INITIAL LOAD
// ===============================


renderTransactions();
// ======================================
// PART 2
// SUMMARY + SEARCH + FILTER + AI
// ======================================


// ===============================
// GET ELEMENTS
// ===============================

const balance =
document.getElementById("balance");

const income =
document.getElementById("income");

const expense =
document.getElementById("expense");


const search =
document.getElementById("search");


const filter =
document.getElementById("filter");


const aiMessage =
document.getElementById("aiMessage");




// ===============================
// UPDATE SUMMARY
// ===============================


function updateSummary(){


    let totalIncome = 0;

    let totalExpense = 0;



    transactions.forEach((item)=>{


        if(item.type === "income"){

            totalIncome += item.amount;

        }

        else{

            totalExpense += item.amount;

        }


    });



    let totalBalance =
    totalIncome - totalExpense;



    if(income){

        income.innerHTML =
        `₹${totalIncome.toLocaleString()}`;

    }


    if(expense){

        expense.innerHTML =
        `₹${totalExpense.toLocaleString()}`;

    }


    if(balance){

        balance.innerHTML =
        `₹${totalBalance.toLocaleString()}`;

    }


}




// ===============================
// SEARCH TRANSACTION
// ===============================


search.addEventListener("keyup",()=>{


    let keyword =
    search.value.toLowerCase();



    const items =
    document.querySelectorAll("#transactionList li");



    items.forEach((item)=>{


        if(
            item.innerText
            .toLowerCase()
            .includes(keyword)
        ){

            item.style.display="flex";

        }

        else{

            item.style.display="none";

        }


    });



});





// ===============================
// FILTER
// ===============================


filter.addEventListener("change",()=>{


    let value =
    filter.value;



    transactionList.innerHTML="";



    let filtered;



    if(value==="all"){

        filtered = transactions;

    }

    else{


        filtered =
        transactions.filter(
            item=>item.type===value
        );


    }




    filtered.forEach((item)=>{


        const li =
        document.createElement("li");

        li.className=item.type;



        li.innerHTML=`

        <div>

            <h3>${item.title}</h3>

            <p>${item.category}</p>

            <small>${item.date}</small>

        </div>


        <div>

            <h3>

            ${item.type==="income" ? "+" : "-"}

            ₹${item.amount}

            </h3>


            <button onclick="deleteTransaction(${item.id})">

            Delete

            </button>


        </div>

        `;



        transactionList.appendChild(li);



    });



});





// ===============================
// AI INSIGHTS
// ===============================


function updateAI(){


    let totalIncome=0;

    let totalExpense=0;



    transactions.forEach((item)=>{


        if(item.type==="income"){

            totalIncome += item.amount;

        }

        else{

            totalExpense += item.amount;

        }


    });



    if(!aiMessage) return;



    if(transactions.length===0){


        aiMessage.innerHTML =
        "💡 Add transactions to get AI financial insights.";


    }


    else if(totalExpense > totalIncome){


        aiMessage.innerHTML =
        "⚠️ Your expenses are higher than income. Reduce unnecessary spending.";


    }


    else if(totalExpense > totalIncome*0.8){


        aiMessage.innerHTML =
        "📊 You are using more than 80% income. Try saving more.";


    }


    else{


        aiMessage.innerHTML =
        "✅ Great! Your financial health looks good. Keep saving.";


    }



}





// ===============================
// RUN UPDATE
// ===============================


updateSummary();

updateAI();
// ======================================
// PART 3
// CHARTS + BUDGET + CATEGORY ANALYTICS
// ======================================


// ===============================
// CHART VARIABLES
// ===============================

let pieChart;

let barChart;



// ===============================
// CREATE PIE CHART
// ===============================


function createPieChart(){


    const canvas =
    document.getElementById("pieChart");


    if(!canvas) return;



    let totalIncome=0;

    let totalExpense=0;



    transactions.forEach((item)=>{


        if(item.type==="income"){

            totalIncome += item.amount;

        }

        else{

            totalExpense += item.amount;

        }


    });



    if(pieChart){

        pieChart.destroy();

    }



    pieChart = new Chart(
        canvas,
        {

        type:"doughnut",


        data:{


            labels:[

                "Income",

                "Expense"

            ],


            datasets:[{

                data:[

                    totalIncome,

                    totalExpense

                ]

            }]

        },


        options:{


            responsive:true,


            animation:{

                duration:1500

            }


        }


    });


}




// ===============================
// CREATE BAR CHART
// ===============================


function createBarChart(){


    const canvas =
    document.getElementById("barChart");



    if(!canvas) return;



    let incomeAmount=0;

    let expenseAmount=0;



    transactions.forEach((item)=>{


        if(item.type==="income"){

            incomeAmount += item.amount;

        }

        else{

            expenseAmount += item.amount;

        }


    });




    if(barChart){

        barChart.destroy();

    }




    barChart = new Chart(

        canvas,

        {


        type:"bar",


        data:{


            labels:[

                "Income",

                "Expense"

            ],


            datasets:[{


                label:"Amount ₹",


                data:[

                    incomeAmount,

                    expenseAmount

                ]


            }]


        },


        options:{


            responsive:true,


            animation:{

                duration:1200

            }


        }



    });



}





// ===============================
// MONTHLY BUDGET
// ===============================


const monthlyBudget = 20000;



function updateBudget(){



    const progress =
    document.getElementById("budgetProgress");


    const text =
    document.getElementById("budgetText");



    if(!progress || !text) return;



    let totalExpense=0;



    transactions.forEach((item)=>{


        if(item.type==="expense"){


            totalExpense += item.amount;


        }


    });



    let percentage =

    (totalExpense/monthlyBudget)*100;



    if(percentage>100){

        percentage=100;

    }




    progress.value = percentage;



    text.innerHTML =

    `${percentage.toFixed(0)}% Used`;



}




// ===============================
// CATEGORY ANALYTICS
// ===============================


function updateCategoryAnalytics(){



    const box =
    document.getElementById("categoryAnalytics");



    if(!box) return;



    box.innerHTML="";



    let categories={};



    transactions.forEach((item)=>{


        if(item.type==="expense"){



            if(!categories[item.category]){


                categories[item.category]=0;


            }



            categories[item.category]+=item.amount;



        }


    });





    Object.keys(categories).forEach((cat)=>{


        let div =
        document.createElement("div");



        div.className="category-card";



        div.innerHTML=`

            <h3>${cat}</h3>

            <p>

            ₹${categories[cat]}

            </p>

        `;



        box.appendChild(div);



    });



}





// ===============================
// UPDATE ALL FEATURES
// ===============================


function updateCharts(){


    createPieChart();


    createBarChart();


    updateBudget();


    updateCategoryAnalytics();
    calculateHealthScore();
    calculateSavingPrediction();
    analyzeExpenses();
    updateAnimatedSummary();
}



// run

updateCharts();
// ======================================
// PART 4
// PDF + CSV + DARK MODE + TOAST + LOADING
// ======================================



// ===============================
// EXPORT CSV
// ===============================


function exportCSV(){


    if(transactions.length===0){

        alert("No Transactions Found!");

        return;

    }



    let csv =

    "Title,Amount,Type,Category,Date\n";



    transactions.forEach((item)=>{


        csv +=

        `${item.title},${item.amount},${item.type},${item.category},${item.date}\n`;


    });




    const blob =

    new Blob(

        [csv],

        {

            type:"text/csv"

        }

    );



    const url =

    URL.createObjectURL(blob);



    const link =

    document.createElement("a");



    link.href=url;


    link.download="AI_Finance_Report.csv";


    link.click();



}




// ===============================
// EXPORT PDF
// ===============================


// ===============================
// EXPORT PDF FIXED
// ===============================

// ======================================
// PROFESSIONAL PDF REPORT
// ======================================


function exportPDF(){


    if(typeof window.jspdf === "undefined"){

        alert("PDF Library Loading...");

        return;

    }



    const { jsPDF } = window.jspdf;


    const pdf = new jsPDF();



    let income = 0;

    let expense = 0;



    transactions.forEach((item)=>{


        if(item.type==="income"){

            income += item.amount;

        }

        else{

            expense += item.amount;

        }


    });



    let saving = income - expense;



    // TITLE


    pdf.setFontSize(22);


    pdf.text(

        "AI Finance Tracker",

        20,

        25

    );



    pdf.setFontSize(12);


    pdf.text(

        "Monthly Financial Report",

        20,

        35

    );



    pdf.text(

        "Date: " + new Date().toLocaleDateString(),

        20,

        45

    );





    // SUMMARY



    pdf.setFontSize(15);


    pdf.text(

        "Financial Summary",

        20,

        65

    );



    pdf.setFontSize(12);



    pdf.text(

        "Total Income : Rs." + income,

        20,

        80

    );



    pdf.text(

        "Total Expense : Rs." + expense,

        20,

        90

    );



    pdf.text(

        "Total Savings : Rs." + saving,

        20,

        100

    );





    // TRANSACTIONS



    pdf.setFontSize(15);


    pdf.text(

        "Transactions",

        20,

        125

    );



    let y = 140;



    pdf.setFontSize(11);



    transactions.forEach((item)=>{


        pdf.text(

        `${item.title} | Rs.${item.amount} | ${item.type} | ${item.date}`,

        20,

        y

        );


        y += 10;



        if(y > 280){

            pdf.addPage();

            y = 20;

        }



    });




    pdf.save(

        "AI_Finance_Professional_Report.pdf"

    );



}// ===============================
// TOAST MESSAGE
// ===============================


function showToast(message){



    const toast =

    document.getElementById("toast");



    if(!toast) return;



    toast.innerHTML=message;



    toast.classList.add("show");



    setTimeout(()=>{


        toast.classList.remove("show");


    },2500);



}





// ===============================
// DARK MODE
// ===============================


const themeBtn =

document.getElementById("themeBtn");



let dark = true;



if(themeBtn){



themeBtn.addEventListener(

"click",

()=>{



    dark=!dark;



    if(dark){


        document.body.style.filter="none";


        themeBtn.innerHTML=

        '<i class="fa-solid fa-moon"></i>';



    }

    else{


        document.body.style.filter=

        "brightness(1.2)";



        themeBtn.innerHTML=

        '<i class="fa-solid fa-sun"></i>';



    }




});



}




// ===============================
// LOADING SCREEN
// ===============================


window.addEventListener(

"load",

()=>{


    const loader =

    document.getElementById("loadingScreen");



    if(loader){



        setTimeout(()=>{


            loader.style.display="none";



        },1500);



    }



});




// ===============================
// AUTO REFRESH AFTER CHANGES
// ===============================


// Override add update

form.addEventListener(

"submit",

()=>{


    setTimeout(()=>{


        updateSummary();

        updateAI();

        updateCharts();



        showToast(
            "Transaction Added Successfully ✅"
        );



    },100);



});




// Update after delete

const oldDelete = deleteTransaction;


deleteTransaction = function(id){


    oldDelete(id);


    updateSummary();

    updateAI();

    updateCharts();


    showToast(

        "Transaction Deleted 🗑️"

    );


};
// ======================================
// AI FINANCE CHAT ASSISTANT
// ======================================


const askAI = document.getElementById("askAI");

const userQuestion = document.getElementById("userQuestion");

const chatMessages = document.getElementById("chatMessages");



if(askAI){


askAI.addEventListener("click",()=>{


    let question = userQuestion.value.toLowerCase();



    if(question.trim()===""){

        return;

    }



    // User Message


    let userDiv = document.createElement("div");


    userDiv.className="user-message";


    userDiv.innerHTML =

    "👤 " + userQuestion.value;



    chatMessages.appendChild(userDiv);




    // AI Reply


    let reply = getAIReply(question);



   setTimeout(()=>{


    let typingDiv = document.createElement("div");


    typingDiv.className="ai-message typing";


    typingDiv.innerHTML =

    "🤖 AI is thinking...";


    chatMessages.appendChild(typingDiv);



    chatMessages.scrollTop =

    chatMessages.scrollHeight;




    setTimeout(()=>{


        typingDiv.innerHTML =

        "🤖 " + reply;



        chatMessages.scrollTop =

        chatMessages.scrollHeight;



    },1200);



},500);
    userQuestion.value="";



});


}




// ===============================
// AI LOGIC
// ===============================


function getAIReply(question){



    if(question.includes("save")){


        return "Try saving at least 20% of your income every month and avoid unnecessary spending.";


    }



    else if(question.includes("expense")
    || question.includes("spend")){


        return "Track your daily expenses and reduce spending on things you don't need.";


    }



    else if(question.includes("budget")){


        return "Create a monthly budget and divide money into needs, savings and wants.";


    }



    else if(question.includes("income")
    || question.includes("money")){


        return "Increasing income with new skills and managing expenses can improve your financial health.";


    }



    else{


        return "I can help with saving, budgeting, expenses and financial planning.";


    }


}
// ===============================
// CLEAR CHAT
// ===============================


const clearChat =
document.getElementById("clearChat");


if(clearChat){


clearChat.addEventListener("click",()=>{


    chatMessages.innerHTML=`

    <div class="ai-message">

    🤖 Hello! Ask me anything about your money.

    </div>

    `;


});


}
// ======================================
// AI CHAT IMPROVEMENTS
// ======================================


// ENTER KEY SEND

if(userQuestion && askAI){

    userQuestion.addEventListener("keypress", function(e){


        if(e.key === "Enter"){

            askAI.click();

        }


    });

}



// CLEAR CHAT BUTTON

if(clearChat && chatMessages){


    clearChat.addEventListener("click",()=>{


        chatMessages.innerHTML = `

        <div class="ai-message">

            🤖 Hello! Ask me anything about your money.

        </div>

        `;


    });


}



// AUTO SCROLL

function scrollChat(){


    if(chatMessages){


        chatMessages.scrollTop = chatMessages.scrollHeight;


    }


}
// ======================================
// FINANCIAL HEALTH SCORE AI
// ======================================


function calculateHealthScore(){


    const scoreElement =
    document.getElementById("healthScore");


    const messageElement =
    document.getElementById("healthMessage");



    if(!scoreElement || !messageElement){

        return;

    }



    let totalIncome = 0;

    let totalExpense = 0;



    transactions.forEach((item)=>{


        if(item.type === "income"){


            totalIncome += item.amount;


        }

        else{


            totalExpense += item.amount;


        }


    });




    let score = 50;




    // No data

    if(transactions.length === 0){


        scoreElement.innerHTML="0";


        messageElement.innerHTML=

        "Add transactions to calculate your financial score.";


        return;


    }





    // Income vs Expense Logic


    if(totalIncome > totalExpense){


        score += 30;


    }


    else{


        score -= 20;


    }




    // Saving Percentage


    let saving =

    totalIncome - totalExpense;



    if(saving > totalIncome * 0.3){


        score += 20;


    }


    else if(saving < 0){


        score -= 30;


    }




    // Limit Score


    if(score > 100){

        score = 100;

    }



    if(score < 0){

        score = 0;

    }





    scoreElement.innerHTML = score;



    if(score >= 80){


        messageElement.innerHTML =

        "🔥 Excellent! Your financial health is strong.";


    }


    else if(score >= 50){


        messageElement.innerHTML =

        "👍 Good! Try saving more for better results.";


    }


    else{


        messageElement.innerHTML =

        "⚠️ Improve your spending habits and reduce expenses.";


    }



}
// ======================================
// AI SAVING PREDICTION
// ======================================


function calculateSavingPrediction(){


    const savingBox =
    document.getElementById("savingPrediction");



    if(!savingBox) return;



    let totalIncome = 0;

    let totalExpense = 0;



    transactions.forEach((item)=>{


        if(item.type === "income"){


            totalIncome += item.amount;


        }

        else{


            totalExpense += item.amount;


        }


    });




    if(transactions.length === 0){


        savingBox.innerHTML =

        "💡 Add transactions to predict your savings.";


        return;


    }




    let savingAmount =

    totalIncome - totalExpense;




    if(savingAmount > 0){


        savingBox.innerHTML = `

        💰 You can save approximately

        <br>

        <strong>

        ₹${savingAmount.toLocaleString()}

        </strong>

        <br><br>

        🤖 AI Tip:

        Maintain your current spending habits and keep saving.

        `;


    }


    else{


        savingBox.innerHTML =

        `

        ⚠️ Your expenses are higher than your income.

        <br><br>

        🤖 AI Suggestion:

        Reduce unnecessary expenses and create a budget.

        `;


    }



}
// ======================================
// AI EXPENSE ANALYZER
// ======================================


function analyzeExpenses(){


    const analysisBox =

    document.getElementById("expenseAnalysis");



    if(!analysisBox) return;



    if(transactions.length === 0){


        analysisBox.innerHTML =

        "💡 Add expenses to analyze your spending.";


        return;


    }



    let categories = {};



    transactions.forEach((item)=>{


        if(item.type === "expense"){



            if(!categories[item.category]){


                categories[item.category] = 0;


            }



            categories[item.category] += item.amount;


        }


    });





    let highestCategory = "";

    let highestAmount = 0;



    Object.keys(categories).forEach((category)=>{


        if(categories[category] > highestAmount){


            highestAmount = categories[category];


            highestCategory = category;


        }


    });





    if(highestAmount === 0){


        analysisBox.innerHTML =

        "🎉 No expenses found. Great control!";


        return;


    }





    let suggestion = "";



    if(highestCategory === "Food"){


        suggestion =

        "Try reducing food orders and eating outside less.";


    }


    else if(highestCategory === "Shopping"){


        suggestion =

        "Avoid unnecessary shopping and plan purchases.";


    }


    else if(highestCategory === "Entertainment"){


        suggestion =

        "Control entertainment spending to save more.";


    }


    else{


        suggestion =

        "Review this category and find ways to reduce spending.";


    }






    analysisBox.innerHTML = `


    🔍 Highest Spending Category:

    <br>


    <strong>

    ${highestCategory}

    </strong>



    <br><br>


    💸 Amount Spent:

    <strong>

    ₹${highestAmount.toLocaleString()}

    </strong>



    <br><br>


    🤖 AI Suggestion:

    <br>

    ${suggestion}


    `;



}
// ======================================
// AI SPENDING SCORE
// ======================================


function calculateSpendingScore(){


    const scoreElement =
    document.getElementById("spendingScore");


    const messageElement =
    document.getElementById("spendingMessage");



    if(!scoreElement || !messageElement){

        return;

    }



    let totalIncome = 0;

    let totalExpense = 0;



    transactions.forEach((item)=>{


        if(item.type === "income"){


            totalIncome += item.amount;


        }

        else{


            totalExpense += item.amount;


        }


    });




    if(transactions.length === 0){


        scoreElement.innerHTML = "0";


        messageElement.innerHTML =

        "Add transactions to calculate your spending score.";


        return;


    }




    let score = 100;



    // No income data

    if(totalIncome === 0){


        score = 40;


    }

    else{


        let expenseRatio =

        (totalExpense / totalIncome) * 100;



        if(expenseRatio <= 30){


            score = 95;


        }


        else if(expenseRatio <= 50){


            score = 80;


        }


        else if(expenseRatio <= 70){


            score = 60;


        }


        else if(expenseRatio <= 100){


            score = 40;


        }


        else{


            score = 20;


        }


    }





    scoreElement.innerHTML = score;




    if(score >= 90){


        messageElement.innerHTML =

        "🔥 Excellent spending control! Keep it up.";


    }


    else if(score >= 70){


        messageElement.innerHTML =

        "👍 Good spending habits. You can improve savings.";


    }


    else if(score >= 50){


        messageElement.innerHTML =

        "⚠️ Try reducing unnecessary expenses.";


    }


    else{


        messageElement.innerHTML =

        "🚨 High spending detected. Create a strict budget.";


    }



}
// ======================================
// ANIMATED NUMBER COUNTER
// ======================================


function animateNumber(element, value){


    if(!element) return;


    let start = 0;


    let end = Number(value);


    let duration = 1000;


    let increment = end / (duration / 20);



    let counter = setInterval(()=>{


        start += increment;



        if(start >= end){


            start = end;


            clearInterval(counter);


        }



        element.innerHTML =

        "₹" + Math.floor(start).toLocaleString();



    },20);



}




// UPDATE SUMMARY WITH ANIMATION


function updateAnimatedSummary(){


    let totalIncome = 0;


    let totalExpense = 0;



    transactions.forEach((item)=>{


        if(item.type==="income"){


            totalIncome += item.amount;


        }

        else{


            totalExpense += item.amount;


        }


    });




    let totalBalance =

    totalIncome - totalExpense;




    animateNumber(

        document.getElementById("balance"),

        totalBalance

    );



    animateNumber(

        document.getElementById("income"),

        totalIncome

    );



    animateNumber(

        document.getElementById("expense"),

        totalExpense

    );


}
// ======================================
// LIVE DATE AND TIME
// ======================================


function updateDateTime(){


    const date =
    document.getElementById("currentDate");


    const time =
    document.getElementById("currentTime");



    if(!date || !time) return;



    let now = new Date();



    date.innerHTML =

    "📅 " + now.toLocaleDateString();



    time.innerHTML =

    "⏰ " + now.toLocaleTimeString();



}



setInterval(updateDateTime,1000);


updateDateTime();
// ======================================
// AI MONTHLY REPORT
// ======================================


const generateReport =

document.getElementById("generateReport");



const reportResult =

document.getElementById("reportResult");




if(generateReport){


generateReport.addEventListener("click",()=>{


    let income = 0;

    let expense = 0;



    transactions.forEach((item)=>{


        if(item.type==="income"){

            income += item.amount;

        }

        else{

            expense += item.amount;

        }


    });



    let saving = income-expense;



    let advice="";



    if(expense > income){


        advice =

        "⚠️ Expenses are higher than income. Try reducing unnecessary spending.";


    }

    else if(saving > income*0.3){


        advice =

        "🔥 Excellent! You are saving more than 30% of your income.";


    }

    else{


        advice =

        "💡 Try increasing savings and tracking daily expenses.";


    }





    reportResult.innerHTML = `


    📊 <b>Monthly Finance Report</b>

    <br><br>


    💰 Income:

    ₹${income}


    <br>


    💸 Expense:

    ₹${expense}



    <br>


    🏦 Savings:

    ₹${saving}



    <br><br>


    🤖 AI Advice:

    ${advice}



    `;



});


}
// ======================================
// AI FUTURE PREDICTION
// ======================================


const predictBtn =

document.getElementById("predictBtn");



const predictionResult =

document.getElementById("predictionResult");




if(predictBtn){


predictBtn.addEventListener("click",()=>{


    let income = 0;

    let expense = 0;



    transactions.forEach((item)=>{


        if(item.type==="income"){


            income += item.amount;


        }

        else{


            expense += item.amount;


        }


    });



    let futureExpense = expense * 1.1;


    let futureSaving = income - futureExpense;



    if(futureSaving < 0){

        futureSaving = 0;

    }





    predictionResult.innerHTML = `


    🔮 <b>AI Forecast</b>

    <br><br>


    💸 Expected Expense:

    ₹${futureExpense.toFixed(0)}



    <br>


    🏦 Expected Saving:

    ₹${futureSaving.toFixed(0)}



    <br><br>


    🤖 AI Advice:

    Track your spending regularly and improve your savings habits.



    `;



});


}
// ======================================
// AI EXPENSE ANALYSIS
// ======================================


const expenseAdviceBtn =

document.getElementById("expenseAdviceBtn");



const expenseAdvice =

document.getElementById("expenseAdvice");




if(expenseAdviceBtn){


expenseAdviceBtn.addEventListener("click",()=>{


    let categories = {};



    transactions.forEach((item)=>{


        if(item.type==="expense"){


            if(!categories[item.category]){


                categories[item.category]=0;


            }


            categories[item.category] += item.amount;


        }


    });




    let highestCategory = "";

    let highestAmount = 0;



    Object.keys(categories).forEach((cat)=>{


        if(categories[cat] > highestAmount){


            highestAmount = categories[cat];

            highestCategory = cat;


        }


    });




    if(highestCategory===""){


        expenseAdvice.innerHTML =

        "Add expenses to get AI suggestions.";


    }

    else{


        expenseAdvice.innerHTML = `


        📊 Highest Spending:

        <b>${highestCategory}</b>


        <br>


        💸 Amount:

        ₹${highestAmount}



        <br><br>


        🤖 AI Suggestion:


        Reduce ${highestCategory} spending and focus on saving more.



        `;


    }



});


}
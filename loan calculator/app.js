//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
	// Hide results
	document.getElementById('results').style.display = 'none';

	// Show loader
	document.getElementById('loading').style.display = 'block';

	setTimeout(calculateResults, 2000);
	e.preventDefault();
});

//calculate result
function calculateResults() {
	//UI vars
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalInterest = document.getElementById('total-interest');
	const totalPayment = document.getElementById('total-payment');

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	//compute calculated payment
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = principal * x * calculatedInterest / (x - 1);

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2); //fix decimal points at 2
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

		//hide loading
		document.getElementById('loading').style.display = 'none';

		//show result
		document.getElementById('results').style.display = 'block';
	} else {
		showError('Plz check your input');
	}
}

function showError(error) {
	// Hide results
	document.getElementById('results').style.display = 'none';

	// Hide loader
	document.getElementById('loading').style.display = 'none';
	//create div
	const newDiv = document.createElement('div');
	//get elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');
	//add class
	newDiv.className = 'alert alert-danger';
	//append textnode
	newDiv.appendChild(document.createTextNode(error));
	//insert error above heading
	card.insertBefore(newDiv, heading);
	setTimeout(clearError, 2000);
}

//clear error after 3 seconds
function clearError() {
	document.querySelector('.alert').remove();
}

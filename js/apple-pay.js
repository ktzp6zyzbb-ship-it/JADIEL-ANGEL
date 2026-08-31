document.addEventListener('DOMContentLoaded', function () {
  var amountInput = document.getElementById('pay-amount-input');
  var payButton = document.getElementById('apple-pay-btn');
  var payNote = document.getElementById('pay-note');
  var reader = document.getElementById('reader');
  var readerAmount = document.getElementById('reader-amount');
  var readerStatus = document.getElementById('reader-screen-status');

  if (!amountInput || !payButton || !reader) {
    return;
  }

  function formatAmount(value) {
    var amount = parseFloat(value);
    if (isNaN(amount) || amount < 0) {
      amount = 0;
    }
    return '$' + amount.toFixed(2);
  }

  function syncReaderAmount() {
    readerAmount.textContent = formatAmount(amountInput.value);
  }

  amountInput.addEventListener('input', syncReaderAmount);
  syncReaderAmount();

  // This site has no payment backend, so Apple Pay availability is only used
  // to tailor the message — an ApplePaySession is never actually started,
  // which would otherwise show a real Wallet sheet with no way to complete.
  var canUseApplePay = 'ApplePaySession' in window && window.ApplePaySession.canMakePayments();
  if (canUseApplePay) {
    payNote.textContent = 'This device supports Apple Pay — tap below to try the reader.';
  } else if ('ApplePaySession' in window) {
    payNote.textContent = 'Apple Pay is available on this browser once a card is added to Wallet.';
  } else {
    payNote.textContent = 'Previewing the tap-to-pay experience — Apple Pay works on iPhone, iPad, and Mac in Safari.';
  }

  var isProcessing = false;

  payButton.addEventListener('click', function () {
    if (isProcessing) {
      return;
    }
    isProcessing = true;
    payButton.disabled = true;
    syncReaderAmount();
    readerStatus.textContent = 'Hold near reader…';
    readerStatus.classList.remove('success');
    reader.classList.add('tapping');

    setTimeout(function () {
      readerStatus.textContent = 'Processing…';
    }, 550);

    setTimeout(function () {
      readerStatus.textContent = 'Paid ✓';
      readerStatus.classList.add('success');
    }, 1400);

    setTimeout(function () {
      reader.classList.remove('tapping');
      readerStatus.textContent = 'Ready';
      readerStatus.classList.remove('success');
      payButton.disabled = false;
      isProcessing = false;
    }, 3200);
  });
});

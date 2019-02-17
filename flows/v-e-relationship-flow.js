function VERelationshipFlow({ containerSelector }) {
  var controlInitialized = false;
  var showDerivationsButton = document.querySelector(
    containerSelector + ' .show-derivations-button'
  );
  var derivationCells = document.querySelectorAll(
    containerSelector + ' .derivation'
  );
  return veRelationshipFlow;

  function veRelationshipFlow() {
    if (!controlInitialized) {
      showDerivationsButton.addEventListener(
        'click',
        toggleDerivationVisibility
      );
      controlInitialized = true;
    }
  }

  function toggleDerivationVisibility() {
    var derivationExampleCell = derivationCells[0];
    var opName = 'add';
    showDerivationsButton.textContent = 'Show derivations of edge counts';
    if (derivationExampleCell.classList.contains('hidden')) {
      opName = 'remove';
      showDerivationsButton.textContent = 'Hide derivations of edge counts';
    }
    for (var i = 0; i < derivationCells.length; ++i) {
      derivationCells[i].classList[opName]('hidden');
    }
  }
}

module.exports = VERelationshipFlow;

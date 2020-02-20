function BtWysiwyg(element) {
    this.container = element;
    if (!this.container.hasOwnProperty('BtWysiwyg')) {
        this.Init();
    }
}

BtWysiwyg.prototype.Init = function() {
    if (this.container.hasAttribute('btw-name')) {
        this.container.BtWysiwyg = {
            isEditable: false,
            containerName: this.container.getAttribute('btw-name'),
            initialized: false
        }
        if (this.container.hasAttribute('btw-is-editable')) {
            this.container.BtWysiwyg.isEditable = this.container.getAttribute('btw-is-editable').toLowerCase() === 'true';
        }
        this.CreateBtWysiwygContent();
        this.container.BtWysiwyg.initialized = true;
        this.topBarButtons = this.container.querySelectorAll('.btw-btn');
        this.AddEventListeners();
    }
};

BtWysiwyg.prototype.AddEventListeners = function() {
    this.topBarButtons.forEach(function(tbb){
        tbb.addEventListener('mouseover', this.OnTopBarMouseOverEvent.bind(this));
        tbb.addEventListener('mouseout', this.OnTopBarMouseOutEvent.bind(this));
        if(tbb.classList.contains('edit')) {
            tbb.addEventListener('click',this.OnEditButtonClickEvent.bind(this));
        }
        if(tbb.classList.contains('confirm')) {
            tbb.addEventListener('click',this.OnConfirmButtonClickEvent.bind(this));
        }
        if(tbb.classList.contains('cancel')) {
            tbb.addEventListener('click',this.OnCancelButtonClickEvent.bind(this));
        }
    }.bind(this));
};

BtWysiwyg.prototype.OnTopBarMouseOverEvent = function() {
    this.editableContainer.classList.add('highlight');
};

BtWysiwyg.prototype.OnTopBarMouseOutEvent = function() {
    this.editableContainer.classList.remove('highlight');
};

BtWysiwyg.prototype.OnEditButtonClickEvent = function() {    
    this.container.setAttribute('btw-is-editable', 'true');
    this.editableContainer.setAttribute('contentEditable','true');
};

BtWysiwyg.prototype.OnConfirmButtonClickEvent = function() {
    this.container.setAttribute('btw-is-editable', 'false');
    this.editableContainer.setAttribute('contentEditable','false');
    // dispatchEvent
};

BtWysiwyg.prototype.OnCancelButtonClickEvent = function() {
    this.container.setAttribute('btw-is-editable', 'false');
    this.editableContainer.setAttribute('contentEditable','false');
    // dispatchEvent
};

BtWysiwyg.prototype.CreateBtWysiwygContent = function() {
    this.editableContainer = document.createElement("DIV");
    this.editableContainer.classList.add('btw-editable');
    this.editableContainer.innerHTML = this.container.innerHTML;
    this.container.innerHTML = "";
    this.CreateTopBar();
    this.container.appendChild(this.editableContainer);
};

BtWysiwyg.prototype.CreateTopBar = function() {
    this.topBarContainer = document.createElement("DIV");
    this.topBarContainer.classList.add('btw-topbar');
    this.topBarContainer.innerHTML = this.topBarTemplate();
    this.container.appendChild(this.topBarContainer);
};

BtWysiwyg.prototype.topBarTemplate = function() {
    return `<div class="btw-btn edit"><i class="fas fa-pencil-alt"></i></div>
            <div class="btw-btn confirm"><i class="fas fa-check-circle"></i></div>
            <div class="btw-btn cancel"><i class="fas fa-times-circle"></i></div>`;
};
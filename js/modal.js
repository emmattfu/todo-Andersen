class Modal {
    

    render(text) {
        let modal = document.createElement('div');
        let modalHeader = document.createElement('div');
        let title = document.createElement('div');
        let closeModal = document.createElement('button');
        let modalBody = document.createElement('div');
        let overlay = document.createElement('div');


        modal.classList.add('modal', 'active');

        overlay.setAttribute('id', 'overlay');
        overlay.classList.add('active');

        modalHeader.classList.add('modal-header');

        title.classList.add('title');
        title.textContent = 'Something went wrong!'
        
        closeModal.classList.add('close-button');
        closeModal.textContent = 'X';

        modalBody.classList.add('modal-body');
        modalBody.textContent = text;

        modalHeader.appendChild(title);
        modalHeader.appendChild(closeModal);
        modal.appendChild(modalHeader);
        modal.appendChild(modalBody);

        closeModal.addEventListener('click', e => {
           
            document.querySelector('.modal').remove()
            document.querySelector('#overlay').remove()
        })

        document.querySelector('#main').appendChild(modal)
        document.querySelector('#main').appendChild(overlay)
    }
}

export default new Modal();
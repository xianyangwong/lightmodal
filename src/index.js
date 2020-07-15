const LightModal = () => {
    "use strict";

    let activeModal = []

    const init = () => {
        document.querySelectorAll('[data-lightmodal-open]').forEach(elem => elem.addEventListener('click', openModal))
        document.querySelectorAll('[data-lightmodal-close]').forEach(elem => elem.addEventListener('click', closeModal))
    }

    const openModal = (e) => {
        e.preventDefault()
        e.stopPropagation()
        show(e.target.dataset.lightmodalOpen)
    }

    const closeModal = (e) => {
        e.preventDefault()
        e.stopPropagation()
        closeElement(activeModal[activeModal.length - 1])
    }

    const show = (name) => {
        const modal = document.querySelector(`[data-lightmodal="${name}"]`)
        if (!modal) return false
        modal.classList.add('is-open')
        modal.setAttribute('aria-hidden', 'false')
        activeModal.push(modal)
    }

    const close = (name = null) => {
        if (!name) {
            document.querySelectorAll('[data-lightmodal]').forEach(elem => closeElement(elem))
            return
        }
        const modal = document.querySelector(`[data-lightmodal="${name}"]`)
        closeElement(modal)
    }
    
    const closeElement = (elem) => {
        if (!elem) return false
        elem.setAttribute('aria-hidden', 'true')
        elem.addEventListener('animationend', function handler () {
            elem.classList.remove('is-open')
            elem.removeEventListener('animationend', handler, false)
        }, false)
        activeModal.pop()
    }

    return { init, show, close }

}

export default LightModal
window.LightModal = LightModal
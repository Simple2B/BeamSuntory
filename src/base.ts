import 'flowbite'
import { Dismiss } from 'flowbite'
import type { DismissOptions, DismissInterface } from 'flowbite'

const themeToggleDarkIcons = document.querySelectorAll('#theme-toggle-dark-icon')
const themeToggleLightIcons = document.querySelectorAll('#theme-toggle-light-icon')

// Change the icons inside the button based on previous settings
if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
    themeToggleLightIcons.forEach(function (el) {
        el.classList.remove('hidden')
    })
    document.documentElement.classList.add('dark')
} else {
    themeToggleDarkIcons.forEach(function (el) {
        el.classList.remove('hidden')
    })
    document.documentElement.classList.remove('dark')
}

const themeToggleButtons = document.querySelectorAll('#theme-toggle')

themeToggleButtons.forEach(function (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
        // toggle icons inside button
        themeToggleDarkIcons.forEach(function (themeToggleDarkIcon) {
            themeToggleDarkIcon.classList.toggle('hidden')
        })

        themeToggleLightIcons.forEach(function (themeToggleLightIcon) {
            themeToggleLightIcon.classList.toggle('hidden')
        })

        // if set via local storage previously
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark')
                localStorage.setItem('color-theme', 'dark')
            } else {
                document.documentElement.classList.remove('dark')
                localStorage.setItem('color-theme', 'light')
            }

            // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark')
                localStorage.setItem('color-theme', 'light')
            } else {
                document.documentElement.classList.add('dark')
                localStorage.setItem('color-theme', 'dark')
            }
        }
    })
})

//----auto hide toast----
// target element that will be dismissed
const $targetEl: HTMLElement = document.querySelector('[id^=toast-]')

// optional trigger element
const $triggerEl: HTMLElement = document.getElementById('close-toast-btn')

// options object
const options: DismissOptions = {
    transition: 'transition-opacity',
    duration: 5000,
    timing: 'ease-out',

    // callback functions
    onHide: (context, targetEl) => {
        console.log('element has been dismissed')
        console.log(targetEl)
    },
}

/*
 * targetEl: required
 * triggerEl: optional
 * options: optional
 */
const dismiss: DismissInterface = new Dismiss($targetEl, $triggerEl, options)

// programmatically hide it
if ($targetEl && $triggerEl) {
    $triggerEl.addEventListener('click', () => {
        dismiss.hide()
    })
    setTimeout(() => {
        dismiss.hide()
    }, 5000)
}

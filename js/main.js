import { Parallax } from './Parallax.js';
import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
    new Parallax();

    // Animate the hero title
    gsap.fromTo(
        "#hero h1",
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );

    // Animate the subheading
    gsap.fromTo(
        "#hero .subheading",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: "power2.out" }
    );

    // Animate the buttons
    gsap.fromTo(
        "#hero .btn",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 2, stagger: 0.2 }
    );

    // Animate the LinkedIn button
    gsap.fromTo(
        "#hero .linkedin-btn img",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, delay: 2.5, ease: "elastic.out(1, 0.5)" }
    );
});

let lastFactIndex = -1; // Initialize a variable to store the last fact index

function generateFact() {
    const facts = [
        "I am currently obsessed with listening to Sabrina Carpenter while working!",
        "My favorite food is sushi 🍣!",
        "I once built a website in under 24 hours.",
        "I’m a huge fan of Studio Ghibli films 🎥.",
        "I’ve been obsessed with pink since I was a kid!",
        "When I’m not coding, you’ll find me playing Roblox!"
    ];

    let randomIndex;

    // Ensure the new fact is not the same as the last one
    do {
        randomIndex = Math.floor(Math.random() * facts.length);
    } while (randomIndex === lastFactIndex);

    lastFactIndex = randomIndex; // Update the last fact index
    const randomFact = facts[randomIndex];
    const factElement = document.getElementById("fact");

    // Set the new fact text
    factElement.textContent = randomFact;

    // Apply fade-in animation
    gsap.fromTo(
        factElement,
        { opacity: 0, y: 20 }, // Start invisible and slightly lower
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" } // Fade in and move up
    );
}



window.generateFact = generateFact;


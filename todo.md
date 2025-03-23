# Frontend opgave
Dette er en case, der kan afspejle det daglige arbejde for en frontend-udvikler i vores team. Vi forventer ikke, at du bruger mere end 4 timer på denne opgave (og det er helt i orden ikke at kunne udføre hele arbejdet inden for denne tidsgrænse).  

## Must-haves
- Opret et nyt projekt i React eller Vue.
- Brug dette API, https://www.theaudiodb.com/api_guide.php, til at hente en liste over albums fra din yndlingsartist og præsenter dem i appen.
- Opret både en listevisning og en kortvisning af data.
- Implementér en mulighed for at skifte mellem liste- og kortvisning, og gem den valgte state (du vælger selv hvordan), så visningen gendannes ved genindlæsning af browseren.
- Opret en visning, hvor man kan se detaljerede oplysninger for hvert album fra API'et. Du vælger selv, hvilke oplysninger der skal vises.
- Gør det muligt at navigere tilbage til listevisningen.
- Implementér designet fra denne Figma-fil. (https://www.figma.com/proto/IWlpD8Uk4qRYNwPl83UP3G/FE-Case?type=design&node-id=1-123&t=5Ek1nxqY9doTqQZW-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A123)
- Ikoner kan findes i svg-mappen fra dette repo.

## Nice-to-haves (valgfrit)
- Opret en eller flere tests i projektet ved hjælp af et passende test-framework, der demonstrerer din erfaring med testning.  
- Gør det muligt at rate et album.

## Overlevering 
- Angiv venligst et link til dit git-repository med løsningen.  
- Projektet skal kunne køre via pnpm, npm eller yarn.



Cypress test:

1. npm install cypress --save-dev

2. npx cypress open 
(mens npm run dev kører i projektet)

3. vælg E2E Testing

4. vælg Firefox

5. vælg myTest.cy.js

6. Test kører

7. Tjek at testen passer

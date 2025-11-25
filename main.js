 const bibliotheque = [];

    document.getElementById("ajouter").addEventListener("click", () => {
        window.open("ajouter.html", "_blank", "width=520,height=750");
    });

    function afficher(filtres = bibliotheque) {
        const listes = document.getElementById("listeslivres");
        listes.innerHTML = filtres.length === 0 
            ? "<p style='text-align:center; color:#800; font-size:2rem; grid-column:1/-1; padding:50px;'>No grimoire found in the darkness...</p>"
            : "";

        filtres.forEach(livre => {
            const carte = document.createElement("div");
            carte.className = "carte";

            const img = livre.image?.trim() ? livre.image : "https://via.placeholder.com/300x400/200/400?text=Grimoire+Perdu";

            carte.innerHTML = `
                <img src="${img}" alt="Couverture">
                <h2>${livre.titre}</h2>
                <p><strong>Author :</strong> ${livre.auteur}</p>
                <p><strong>Year :</strong> ${livre.annee}</p>
                <p><strong>Price :</strong> ${livre.prix}</p>
                <p><strong>Status :</strong> <span style="color:${livre.checkbox ? '#0f0' : '#f00'}; text-shadow:0 0 10px currentColor;">
                    ${livre.checkbox ? "Available" : "Owned"}
                </span></p>
            `;

            const btn = document.createElement("button");
            btn.textContent = "remove";
            btn.onclick = () => supprimer(livre.code);
            carte.appendChild(btn);
            listes.appendChild(carte);
        });

        statistic();
    }

    function supprimer(code) {
        if (confirm("Burn this grimoire forever?")) {
            const index = bibliotheque.findIndex(l => l.code === code);
            if (index !== -1) {
                bibliotheque.splice(index, 1);
                afficher();
            }
        }
    }

    document.getElementById("search").addEventListener("input", function () {
        const text = this.value.toLowerCase().trim();
        const filtres = text ? bibliotheque.filter(l => l.titre?.toLowerCase().includes(text)) : bibliotheque;
        afficher(filtres);
    });

    function statistic() {
        const dispo = bibliotheque.filter(l => l.checkbox).length;
        document.getElementById("statistic").innerText =
            `Available in the darkness : ${dispo} | Total of grimoires : ${bibliotheque.length}`;
    }
    window.ajouterLivre = function(livre) {
        livre.code = Date.now().toString();
        bibliotheque.push(livre);
        afficher();
    };
    afficher(); 
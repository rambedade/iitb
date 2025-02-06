// document.addEventListener("DOMContentLoaded", function () {
//   fetch("http://localhost:3000/")  
//       // .then(response => response.json())
//       .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//     })
//       .then(data => {
//           const container = document.getElementById("animalTables");

//           const categories = ["Big Cats", "Dogs", "Big Fish"];

//           categories.forEach((category, index) => {
//               if (!data[category]) return;

//               let tableHTML = `
//                   <div class="category-header">Table ${index + 1}: ${category}</div>
//                   <table class="table">
//                       <tbody>
//               `;

//               data[category].forEach((animal, i) => {
//                   if (i % 2 === 0) tableHTML += `<tr>`;  

//                   tableHTML += `
//                       <td>
//                           <div class="animal-card">
//                               <p><strong>Species:</strong> ${animal.Species}</p>
//                               <p><strong>Name:</strong> ${animal.Name}</p>
//                               <p><strong>Size:</strong> ${animal.Size}</p>
//                               <p><strong>Location:</strong> ${animal.Location}</p>
//                               <img src="${animal.img}" alt="${animal.Name}">
//                           </div>
//                       </td>
//                   `;

//                   if (i % 2 === 1 || i === data[category].length - 1) tableHTML += `</tr>`; 
//               });

//               tableHTML += `
//                       </tbody>
//                   </table>
//               `;

//               container.innerHTML += tableHTML;
//           });
//       })
//       .catch(error => console.error(error));
// });


// const categories = ["Big Cats", "Dogs", "Big Fish"];

// categories.forEach(category => {
//   fetch(`http://localhost:3000/${category}`)
//     .then(response => response.json())
//     .then(data => console.log(`${category}:`, data))
//     .catch(error => console.error(`Error fetching ${category}:`, error));
// });

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("animalTables"); // Ensure the container exists
  
    const categories = ["Big Cats", "Dogs", "Big Fish"];
    const baseUrl = "http://localhost:3000/";
  
    // Fetch all categories in parallel
    Promise.all(categories.map(category => 
      fetch(baseUrl + encodeURIComponent(category)) // Handle spaces in URL
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => ({ category, data })) // Return category name with data
    ))
    .then(results => {
      results.forEach(({ category, data }, index) => {
        if (!data || data.length === 0) return; // Skip empty categories
  
        let tableHTML = `
          <div class="category-header">Table ${index + 1}: ${category}</div>
          <table class="table">
            <tbody>
        `;
  
        data.forEach((animal, i) => {
          if (i % 2 === 0) tableHTML += `<tr>`; // Start new row every 2 items
  
          tableHTML += `
            <td>
              <div class="animal-card">
                <p><strong>Species:</strong> ${animal.Species || "Unknown"}</p>
                <p><strong>Name:</strong> ${animal.Name || "Unknown"}</p>
                <p><strong>Size:</strong> ${animal.Size || "Unknown"}</p>
                <p><strong>Location:</strong> ${animal.Location || "Unknown"}</p>
                <img src="${animal.img || ""}" alt="${animal.Name || "Animal"}">
              </div>
            </td>
          `;
  
          if (i % 2 === 1 || i === data.length - 1) tableHTML += `</tr>`; // Close row
        });
  
        tableHTML += `
            </tbody>
          </table>
        `;
  
        container.innerHTML += tableHTML;
      });
    })
    .catch(error => console.error("Error fetching data:", error));
  });
  
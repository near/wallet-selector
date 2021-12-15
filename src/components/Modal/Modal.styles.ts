export default `
.Modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
}

.Modal .Modal-content {
  max-width: 700px;
  max-height: 70vh;
  width: 400px;
  background-color: white;
  margin: 10px;
  border-radius: 16px;
  padding: 1.5em;
  overflow-y: auto;
}

.Modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(214, 214, 214);
  padding-bottom: 0.5em;
}

.Modal-header button {
  border: 0;
  cursor: pointer;
}

.Modal-header h3 {
  margin: 0;
}

.Modal-option-list {
  margin: 0;
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.Modal-option-list li {
  padding: 1em;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid #f4f4f4;
  display: flex;
}

.Modal-option-list li div {
  margin: auto;
}

.Modal-option-list li:hover {
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
}

.Modal-option-list li img {
  display: block;
  margin: 0 auto 5px;
  max-width: 50px;
}

.Modal-dark-theme .Modal-content {
  background-color: #414141;
  color: white;
}

.Modal-dark-theme .Modal-content .Modal-option-list li {
  border-color: #393939;
  transition: background-color 0.2s ease-in-out;
}

.Modal-dark-theme .Modal-content .Modal-option-list li:hover {
  background-color: #313131;
}

@media (prefers-color-scheme: dark) {
  .Modal:not(.Modal-light-theme) .Modal-content {
    background-color: #26292a !important;
    color: white;
  }

  .Modal:not(.Modal-light-theme) .Modal-content .Modal-option-list li {
    border-color: black;
  }

  .Modal:not(.Modal-light-theme) .Modal-content .Modal-option-list li:hover {
    border-color: white;
  }
}

`;

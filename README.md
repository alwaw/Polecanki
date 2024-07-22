** english below **

<h1>Cześć!</h1>

Przedstawiam prostą aplikację, którą stworzyłam w ramach podsumowania mojej nauki Reacta.
Jest to tracker obejrzanych seriali, w którym możemy oceniać oraz pisać opinie na temat
obejrzanych seriali.

<b>Strona główna z predefiniowanymi serialami:</b>

![homepage](<sreenshots/Main view.png>)

Są to wybrane przeze mnie seriale wraz z moją prywatną opinią oraz oceną.

Oczywiście możemy dodać kolejny serial, klikając przycisk na końcu kolejki Ostatnio dodanych:

![adding a new show](<sreenshots/Searching a new show.png>)

Pojawia nam się okno wyszukiwania serialu. Po wybraniu tytułu oraz kliknięciu lupy łączymy się z bazą TMDB w poszukiwaniu tytułu (może to być tytuł w języku polskim, ale może też być w języku pochodzenia danego serialu).

<h3>Warianty są trzy:</h3>

1 - tytuł już został dodany do naszego trackera. Pojawia się stosowny komunikat (obecnie z odnośnikiem do strony głównej, w przyszłości będzie możliwość edycji serialu już na tym ekranie);

2 - tytuł nie został odnaleziony w bazie TMDB. Pojawia się stosowny komunikat wraz z odnośnikiem do TMDB.

3 - tytuł został znaleziony - wyświetlają się podstawowe informacje pobrane z bazy TMDB:

![show has been found!](<sreenshots/Adding a new show.png>)

<h4>Pojawia się następujące dane:</h4>

- oryginalny tytuł
- plakat
- opis
- gatunek/gatunki
- ocena z TMDB

A także pojawiają się dwa pola dla użytkownika:

- ocena użytkownika
- opinia użytkownika

Dodałam walidację: dopóki użytkownik nie oceni oraz nie napisze opinii, przycisk "Dodaj" jest nieaktywny.

![rating and review](<sreenshots/user's rating and review.png>)

Zarówno liczbę generowanych gwiazdek (w ocenie użytkownika) oraz liczbę znaków w opinii użytkownika można ustawić w pliku utils/const.jsx.

Po dodaniu informacji od użytkownika ekran wygląda tak:

![ready to add to Titles Display](<sreenshots/ready to add to Titles Display.png>)

Po kliknięciu Dodaj ekran jest zerowany i przywracany do pierwotnego wyglądu z wyszukiwarką.

Możemy teraz przejść do strony głównej, która po dodaniu serialu wygląda tak:

![homepage with recently added](<sreenshots/Our new in Recently Added and one of genre category.png>)

Ostatnio dodany serial pojawia się w pierwszej belce jako pierwszy. Pojawia się też w kategoriach gatunkowych:

![all genres](<sreenshots/Rest of the genre categories.png>)

Każdy serial można kliknąć - pojawia się wtedy modal ze znanym już widokiem:

![modal](<sreenshots/Modal with added show.png>)

Z widoku modala możemy edytować ocenę oraz opinię. Planuję również dodanie opcji "Usuń", która usuwałaby całkowicie serial z trackera.

<h3>Edytowanie:</h3>

![editing the modal](<sreenshots/Editing the modal.png>)

![changing a review and rating](<sreenshots/changing a review and rating.png>)

![changes are visible](<sreenshots/After editing a new rating and review are visible.png>)

<h2>Zastosowane rozwiązania: </h2>
React, Zustand, REST API, HTML Dialog (modal)
JavaScript (rzecz jasna :)) 
CSS (flexbox, grid)

<h2>Planowane funkcjonalności: </h2>
- Możliwość usuwania serialu z widoku głównego oraz edycji modala.
- Możliwość edycji serialu, jeśli w wyszukiwarce serialu wpisało się serial, który już został dodany.
- Dodanie belki z dodatkowymi informacjami (w oknie wyszukiwania serialu oraz w modalu): liczbą sezonów, wiodącymi aktorami, oceną tmdb poszczególnych sezonów, liczbą odcików per sezon, średnią długością odcinka itd. Opcjonalnie: możliwość oceniania poszczególnych sezonów przez użytkownika. 
- Własne rankingi seriali (np. TOP 10 seriali, TOP 10 sci-fi & fantasy itd.), które będzie można kopiować i w formie czystego tekstu przeklejać znajomym w formie wiadomości tekstowej.
- Backendowo: możliwość logowania oraz dodawania znajomych (dzięki czemu będziemy mogli się przełączyć między widokiem tylko naszych seriali, a wszystkich seriali dodanych przez nas i znajomych wraz ze średnią ocen).
<br>
<br>
<br>

<h1> ENGLISH VERSION </h1>

soon!

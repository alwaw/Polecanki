function About() {
  return (
    <>
      <p>Cześć!</p>
      <p>
        Ten projekt to podsumowanie mojej nauki Reacta. Chciałam stworzyć coś,
        co nie jest kolejną listą zadań ani kalkulatorem, a jednocześnie pokaże,
        że dobrze rozumiem podstawy Reacta.
      </p>
      <p>
        Dużą frajdę sprawiło mi samo projektowanie mojej witryny – używałam do
        tego Figmy, ale wspierałam się również stronami takimi jak dribbble.com.
        Oczywiste nawiązanie do Netflixa jest zupełnie zamierzone.
      </p>
      <p>
        Największymi wyzwaniami były zarządzanie stanem pomiędzy kilkoma
        komponentami oraz podzielenie komponentów na jak najmniejsze, reużywalne
        elementy lub – w przypadku komponentu AddNew – uproszczenie zbyt
        rozbudowanych komponentów i zdjęcie z nich odpowiedzialności za zbyt
        dużą ilość stanów. Generalnym zamysłem było, aby każdy komponent, w
        miarę możliwości, miał tylko swoje własne stany, a w przypadku danych
        używanych w kilku różnych komponentach, odwoływał się do Zustand store.
      </p>
      <p>
        Największym odkryciem był wspomniany już Zustand, który okazał się łatwą
        i przyjemną – w porównaniu do Reduxa :) – metodą na przechowywanie i
        zarządzanie stanem poza strukturą całego drzewa komponentów.
      </p>
      <p>
        W planach mam rozbudowę tej witryny: - dodanie zakładek z rankingiem -
        seriali z najwyższą oceną z podziałem na gatunki oraz globalnie; -
        dodanie funkcjonalności backendowych: kont użytkowników, możliwość
        dodawanie się do kręgu znajomych, a co za tym idzie: widoczność
        trackerów naszych znajomych, budowanie wspólnych rankingów - dodanie
        opcji łatwego kopiowania listy seriali z wybranego przez nas zakresu
        (np. seriale ze wskazanym zakresem ocen, seriale z danego gatunku) -
        byłaby to gotowa do wklejenia do komunikatora bądź maila lista
        polecanych seriali.
      </p>
      <p>
        Kilka słów o mnie: obecnie uczę się Typescripta oraz Framer Motiona, w
        planach mam również poznanie podstaw pracy z bazami danych oraz
        opanowanie wybranego języka backendowego. Prywatnie jestem matką dwóch
        synów, a przy tym kociarą (niestety obecnie tylko zdalnie) oraz fanką
        gier cRPG. Lubię gotować, z masochistyczną fascynacją śledzę polską
        politykę, namiętnie słucham podcastów. W życiu zawodowym stawiam na
        nieustanny rozwój oraz poszukiwanie wartościowych, inspirujących osób.
        Wierzę, że kluczem do sukcesu jest dobra atmosfera w zespole, która nie
        tylko sprzyja efektywnej współpracy, ale także pozwala na pełne
        wykorzystanie potencjału każdego z jego członków. Tworzenie środowiska,
        w którym ludzie czują się doceniani i wspierani, to dla mnie fundament
        satysfakcjonującej pracy oraz wspólnych osiągnięć.
      </p>
    </>
  );
}

export default About;

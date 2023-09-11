import type { Article } from '../../types/Article'

export const articles: Article[] = [
  // {
  //   id: 586134,
  //   url: 'https://www.lemonde.fr/culture/article/2009/06/25/michael-jackson-a-ete-hospitalise-dans-un-etat-critique_1211647_3246.html',
  //   publicationYear: 2009,
  //   // [WIP] string ou date et on formate ?
  //   publicationDate: '25 juin 2009',
  //   personality: 'Michael Jackson',
  //   nodes: [
  //     {
  //       type: 'publication',
  //       content: 'Publié le 25 juin 2009',
  //     },
  //     {
  //       type: 'title',
  //       content: 'Le roi de la pop, Michael Jackson, est mort',
  //     },
  //     {
  //       type: 'heading',
  //       content:
  //         'Le chanteur est mort, jeudi à Los Angeles, à l’âge de 50 ans. Les causes exactes et le rôle des médicaments dans son décès restent flous. Auteur, compositeur, danseur, Michael Jackson se préparait à un retour sur scène.',
  //     },
  //     {
  //       type: 'paragraph',
  //       content:
  //         "Le chanteur américain Michael Jackson, 50 ans, est mort, jeudi 25 juin, après avoir été hospitalisé en urgence dans un hôpital de Los Angeles. \"M. Jackson a été transporté à l'hôpital (...), il était inconscient lorsqu'il a été admis et son décès a été constaté à 14 h 26 (23 h 26 à Paris) cet après-midi\", a déclaré un porte-parole de l'institut médico-légal du comté de Los Angeles, le lieutenant Fred Corral. Selon le Los Angeles Times et le site Internet TMZ.com, qui a le premier donné la nouvelle, Jackson a été victime d'un arrêt cardiaque à son domicile de Holmby Hills, un quartier opulent du nord-ouest de la ville où il louait un manoir depuis janvier.",
  //     },
  //     {
  //       type: 'paragraph',
  //       content:
  //         "Le lieutenant Corral s'est refusé à toute précision sur les causes du décès, expliquant qu'une autopsie serait pratiquée, sans doute dès vendredi, pour les déterminer. Les autorités ont prévenu qu'il faudrait sans doute plusieurs semaines avant de déterminer la cause exacte du décès, dans l'attente de résultats d'examens toxicologiques.",
  //     },
  //     {
  //       type: 'paragraph',
  //       content:
  //         'Le rôle des médicaments dans le décès du chanteur est pointé du doigt par certains de ses proches. Tarek Ben Amar, un ancien manager, a accusé des médecins "charlatans" qui ont profité selon lui du fait que la star était un "hypocondriaque" se bourrant de médicaments. Jackson serait, selon lui, mort "d\'une crise cardiaque parce qu\'il prenait toutes sortes de médicaments" mais il ne l\'a "jamais vu se droguer". Deux médecins et son avocat sont actuellement inculpés en Californie pour lui avoir donné indûment accès à des médicaments. "Je ne connais pas l\'étendue des médicaments qu\'il prenait mais ce que j\'ai entendu de la famille est que c\'était très important", a ajouté Brian Oxman, l\'avocat de la famille Jackson.',
  //     },
  //     {
  //       type: 'paragraph',
  //       content:
  //         'Peu avant 19 heures, le corps enveloppé dans un linceul blanc a été transporté à la morgue de Los Angeles, transfert filmé en direct par les télévisions locales depuis des hélicoptères. Un des frères aînés de Michael Jackson, Jermaine, est apparu brièvement devant la presse à l\'hôpital. Lisant un communiqué, il a affirmé que les médecins avaient tenté de ranimer son frère pendant une heure, sans succès. Le visage ravagé par le chagrin, il a lui aussi évoqué un Peu avant 19 heures, le corps enveloppé dans un linceul blanc a été transporté à la morgue de Los Angeles, transfert filmé en direct par les télévisions locales depuis des hélicoptères. Un des frères aînés de Michael Jackson, Jermaine, est apparu brièvement devant la presse à l\'hôpital. Lisant un communiqué, il a affirmé que les médecins avaient tenté de ranimer son frère pendant une heure, sans succès. Le visage ravagé par le chagrin, il a lui aussi évoqué un "arrêt cardiaque".',
  //     },
  //     {
  //       type: 'subtitle',
  //       content: 'Une voix reconnaissable entre toutes',
  //     },
  //     {
  //       type: 'paragraph',
  //       content:
  //         'Depuis son acquittement en Californie en 2005 au terme d\'un retentissant procès pour attouchements sexuels sur mineur, Jackson avait vécu quasiment retiré du monde, notamment à Bahreïn et à Las Vegas. Mais le 5 mars, le chanteur avait annoncé à Londres qu\'il donnerait une série de concerts en juillet. "Je chanterai toutes les chansons que mes fans veulent entendre", avait déclaré la star américaine qui devait ainsi faire un come-back spectaculaire après plusieurs années d\'absence. Auteur, compositeur, interprète, danseur, chorégraphe, Michael Jackson, surnommé "The King of Pop", était l\'un des chanteurs les plus célèbres du XXe siècle. Cinq de ses albums studio figurent parmi les plus vendus au monde : Off the Wall (1979), Thriller (1982), Bad (1987), Dangerous (1991) et HIStory (1995).',
  //     },
  //     {
  //       type: 'paragraph',
  //       content:
  //         "Doté d'une voix reconnaissable entre toutes, danseur hors du commun, le roi de la pop a commencé sa carrière très tôt : sous la houlette de son père, Joseph Jackson, le petit Michael a commencé à se produire dès ses 6 ans avec ses frères, au sein des Jackson Five, dont il était le chanteur principal. Plus les années passent, et plus Michael éclipse ses frères par son talent et sa voix. En 1979, il signe en solo chez Epix Records et sort Off The Wall, qui rencontre un succès mondial et se vend à une douzaine de millions d'exemplaires.",
  //     },
  //     {
  //       type: 'subtitle',
  //       content: '"Thriller", album le plus vendu de tous les temps',
  //     },
  //     {
  //       type: 'paragraph',
  //       content:
  //         "Mais il faudra attendre 1982 et l'album Thriller pour que Michael Jackson remporte un vrai succès populaire et critique. L'album se vend à un million d'exemplaires en un mois et dix millions sur un an. Meilleure vente d'album aux Etats-Unis en 1983 et 1984, il a été certifié à 25 millions d'exemplaires aux Etats-Unis et 20 millions à l'étranger entre 1982 et 1996. En mai 1984, Thriller est reconnu par le Livre Guinness des records comme l'album le plus vendu de tous les temps (25 millions d'exemplaires à l'époque) et les estimations actuelles varient entre 65 et 108 millions d'exemplaire. Avec Thriller, Michael Jackson remporte huit récompenses aux American Music Awards et huit aux Grammy Awards. Le nombre total de ses ventes est estimé à 750 millions ce qui le classe plus gros vendeur d'albums de tous les temps pour un artiste solo.",
  //     },
  //     {
  //       type: 'paragraph',
  //       content:
  //         "Les trois clips vidéo (Billie Jean, Thriller et Beat It)accompagnant l'album Thriller sont de véritables mini-films avec de nombreux effets spéciaux. Le clip de 14 minutes de la chanson Thriller, d'un coût de 1 million de dollars, sorti le 2 décembre 1983 est une des premières vidéos d'un artiste noir américain à être diffusé à grande échelle sur MTV.",
  //     },
  //     {
  //       type: 'paragraph',
  //       content:
  //         "Dès le milieu des années 1980, la question de la modification physique de Michael Jackson fait la \"une\" des journaux tabloïd et suscite l'interrogation. Selon ses déclarations, Michael Jackson souffrait d'une maladie de peau appellé vitiligo. En 1987, Michael Jackson sort l'album Bad et part pour la première fois en tournée mondiale sans ses frères. Bad est à nouveau un énorme succès et même si l'album n'atteint pas les records de ventes de Thriller, il contient néanmoins plus de \"hits\" dont Bad, mis en image par Martin Scorsese.",
  //     },
  //     {
  //       type: 'paragraph',
  //       content:
  //         "En 1991, Michael Jackson signe un contrat record de près d'un milliard de dollars avec Sony et sort l'album Dangerous. Il atteint 7 millions d'exemplaires vendus aux Etats-Unis et devient le troisième album le plus vendu dans la carrière de Michael Jackson en atteignant 30 millions de copies vendues derrière Bad avec 32 millions de copies vendues. Son double album HIStory : Past, Present and Future – Book I, sorti en juin 1995, sera le double album le plus vendu de tous les temps. Il contient de nouveaux succès : Scream, en duo avec sa sœur Janet, You Are Not Alone et Earth Song. En octobre 2001 sort Invincible, qui reste à ce jour l'album le plus cher jamais produit (environ 30 millions de dollars).",
  //     },
  //     {
  //       type: 'paragraph',
  //       content:
  //         "Star internationale, son image aura été ternie par sa vie privée. Par deux fois il sera accusé de pédophilie, à chaque fois il sera relaxé ou acquitté. En 1993, le chanteur est notamment accusé d'abus sexuel sur mineur par un enfant de 13 ans mais un accord de 22 millions de dollars signé avec la famille de l'enfant met fin à l'affaire un an plus tard. Quelques mois après, Michael Jackson épouse la fille d'Elvis Presley, Lisa-Marie Presley, pour un mariage qui durera mois de deux ans. Jackson s'est ensuite remarié le 15 novembre 1996 avec Deborah Rowe, infirmière en dermatologie qu'il connaissait depuis 1981. Il aura un fils avec elle, Prince Michael Junior, et une fille appelée Paris Katherine Michael. Michael et Deborah divorcent le 8 octobre 1999.",
  //     },
  //     {
  //       type: 'paragraph',
  //       content:
  //         "De son producteur historique Quincy Jones, \"totalement bouleversé\", à la chanteuse Madonna qui \"ne peu(t) plus (s)'arrêter de pleurer\", le monde du spectacle a rendu un hommage unanime à \"l'une des figures les plus influentes et les plus emblématiques de l'industrie de la musique\", selon les mots du gouverneur de Californie, Arnold Schwarzenegger. Alors que toutes les télévisions des Etats-Unis rivalisaient d'éditions spéciales, à l'extérieur de l'hôpital, des centaines d'admirateurs, certains portant des T-shirts – dont certains imprimés pour l'occasion – à l'effigie de leur idole, se sont rassemblés tout l'après-midi. Mêmes scènes à l'autre bout du pays, devant la légendaire salle de concerts Apollo de Harlem, à New York.",
  //     },
  //   ],
  // },
  {
    id: 43558,
    url: 'https://www.lemonde.fr/disparitions/article/2023/07/16/jane-birkin-chanteuse-et-comedienne-est-morte-a-l-age-de-76-ans_6182211_3382.html',
    publicationYear: 2023,
    // [WIP] string ou date et on formate ?
    publicationDate: '16 juillet 2023',
    personality: 'Jane Birkin',
    nodes: [
      {
        type: 'publication',
        content: 'Publié le 16 juillet 2023',
      },
      {
        type: 'title',
        content: 'Jane Birkin, chanteuse et comédienne, est morte à l’âge de 76 ans',
      },
      {
        type: 'heading',
        content:
          'Avec son mélange de séduction et d’intelligence, sa facilité à étaler ses sentiments sous des dehors pudiques, l’artiste, qui occupait une place à part dans la cartographie des stars françaises, est morte à Paris, dimanche.',
      },
      {
        type: 'paragraph',
        content:
          "Tennis délacées, tee-shirt blanc et jean bleu, Jane Birkin vivait dans un naturel chic, par elle inventé. Anglaise, enracinée en France par la grâce d’un auteur-compositeur d’origine russe, Serge Gainsbourg, elle s’étonnait d’avoir été ainsi fascinée par « les Français, que je trouvais si beaux et par l’univers de Serge, sa religion juive, tellement attractive », au détriment de son pays d’origine. Première conséquence : à tout jamais, on devra à Jane Birkin l’invention d’un « créole » particulier, ce que son ami écrivain Olivier Rolin appelait un français « qui sort de ses gonds ».",
      },
      {
        type: 'paragraph',
        content:
          "Un jour, en 2008, et parce qu’elle était artiste musicienne, elle avait même décidé d’exorciser ses démons linguistiques en écrivant de A à Z Enfants d’hiver (ou divers) – exercice renouvelé douze ans plus tard, en 2020, avec l’album Oh ! Pardon tu dormais, réalisé avec son ami Etienne Daho. « Là, il fallait que je sois précise, que je ne me trompe pas en français, mais je voulais rester moi. J’ai mis du temps à comprendre “l’on s’éreinte”. Je pensais que cela signifiait jeter ses bras autour du cou. Alors, par exemple, je dis : “A la grâce de toi.” Gainsbourg avait bien écrit “l’amour de moi” », disait-elle alors, en riant. Et quand elle souriait, ses yeux se plissaient, c’était Birkin."
      },
      {
        type: 'paragraph',
        content: "Jane Birkin est morte, dimanche 16 juillet, à Paris, selon les informations du Monde. Née le 14 décembre 1946, à Londres, Jane Birkin est la fille de David Birkin, commandant dans la Royal Navy, et de l’actrice Judy Campbell, qui fut la muse de Noël Coward, le célèbre dramaturge britannique. Pierre, ciment, cailloux, ciseaux, feuilles, choux, genoux : les mots chez Birkin changeaient parfois de genre, d’orthographe ou de destination, mais elle n’était jamais bâillonnée."
      },
      {
        type: 'paragraph',
        content: "Après avoir soutenu ses causes et ses héroïnes, volant au secours des offensées, d’Aung San Suu Kyi, Prix Nobel de la paix en 1991, avant qu’elle ne tombe en disgrâce pour cause de collaboration avec la junte birmane, à Christiane Taubira, ancienne garde des sceaux de 2012 à 2016, que des opposants au mariage pour tous voulaient renvoyer « manger des bananes » en Afrique."
      },
      {
        type: 'subtitle',
        content: 'Icône pop',
      },
      {
        type: 'paragraph',
        content:
          'Tout chez Birkin était militant. Le look d’abord, de la robe archi-transparente portée le soir de la première du film Slogan, en 1969, au tailleur-pantalon Saint Laurent des concerts « Gainsbourg symphonique », en 2017. A la ville, au fil du temps, Birkin avait ajouté aux débardeurs échancrés des sweats confortables, des vestes en treillis qui tombaient pile-poil, le chignon et les lunettes demi-lune. Mais elle ne vieillissait pas, elle apprenait la vie en permanence, créature de la nuit et les nerfs à vif.',
      },
      {
        type: 'paragraph',
        content: "En 2008, Jane était déjà grand-mère et portait des pulls tricotés, quand la marque de chaussure Converse en fait une de ses égéries (aux côtés d’Asia Argento en Italie, Nina Hagen en Allemagne, ou feu Ian Curtis en Angleterre…). Des gens, précisait Converse, « choisis pour leur vision optimiste de la rébellion ». En 2021, à 75 ans, la voici au lit avec Etienne Daho pour un clip élégant sur les déboires conjugaux, illustrant la chanson Oh ! Pardon tu dormais, où elle se remémore les déchirures du couple qu’elle a formé avec le compositeur anglais John Barry, elle 17 ans, lui treize ans de plus."
      },
      {
        type: 'paragraph',
        content:
          "Le chanteur et compositeur du groupe Mickey 3D, Mickaël Furnon, avait écrit en 2004 une chanson, Je m’appelle Jane, sous la forme d’un dialogue avec cette agaçante icône pop qui a réponse à tout. Il y posait les questions qui fondaient la relation quasi hypnotique de Birkin avec ses amis artistes et son public, qui s’achevait sur un définitif : « Je m’appelle Jane et je t’emmerde. »",
      },
      {
        type: 'paragraph',
        content:
          "« Dis, Birkin, pourquoi t’as pas grossi en vieillissant ? T’es toujours aussi belle qu’avant. – C’est que je suis maligne »"
      },
      {
        type: 'paragraph',
        content:
          "Maligne sûrement, fine toujours, son cache-col noué avec élégance. Elle était aérienne et, pourtant, tout en profondeur. « Jane marchant sur la plage, chemise de lin au vent, un crayon piqué dans les cheveux, la simplicité, le dépouillement. Jane chez elle à Paris, sous les sombres tissus imprimés, les tentures, les fanfreluches, les guirlandes, les lustres, les bestioles empaillées, les photos, les bibelots de la mémoire : une Anglaise excentrique », écrit Olivier Rolin, rencontré à Sarajevo en 1995 et qui fut son compagnon, dans une lumineuse préface au livre de photographies publié par Jane Birkin et Gabrielle Crawford, son amie d’enfance, sa « sœur », chez Flammarion (2004)."
      },
      {
        type: 'paragraph',
        content: "La vie de Jane, hors « Serge », est une aventure sans rupture – disques, films, théâtre, coups de foudre et coups durs. Sur l’album Enfants d’hiver, la photo de couverture, prise « peut-être par [sa] grand-mère », montre Jane à 12 ans, enfant filiforme, garçonne en ballerines, le regard droit, plantée sur une plage de l’île de Wight – elle y était pensionnaire et, comme elle le raconte dans Jane B. par Agnès V. (1988), on l’appelait par son numéro de chambre : « Ninety-Nine » (99)."
      },
      {
        type: 'paragraph',
        content: "Dans le livret, elle avait placé des portraits de famille – sa mère, son frère Andrew, sa sœur cadette Linda. « Andrew est magnifique, il a la tête du metteur en scène qu’il sera, moi de l’actrice, et Linda, qui déjà ne veut s’impliquer dans rien de tout cela ! » En 2004, sa mère glissait lentement vers la mort dans un hôpital britannique, qui, libéralisme oblige, utilisait des cash nurses, des infirmières indépendantes payées à l’heure. Et Birkin s’indignait. Son père s’est éteint quelques jours après Serge Gainsbourg, en 1991."
      },
      {
        type: 'paragraph',
        content: "Dans l’appartement qu’elle occupait, près de la rue de Verneuil, où vivait Serge Gainsbourg, puis dans sa maison proche du Jardin des plantes, elle avait épinglé des pêle-mêle, conservé des œuvres photographiques, un tirage noir et blanc magnifiquement flou de son frère Andrew, dont le fils, Anno Birkin, s’est tué en 2001, à l’âge de 20 ans, dans un accident de voiture. Chez elle, il y avait des tentures rouges, des tissus moirés, des canapés, une profusion de plantes vertes et de loupiotes en terrasse, des objets, des dessins, un capharnaüm cultivé, chic, sincère. Des casseroles en cuivre, de larges fourneaux, parce que Birkin aimait la famille, ses trois filles – Kate (Barry), Charlotte (Gainsbourg), Lou (Doillon). C’était Birkin."
      },
      {
        type: 'subtitle',
        content: "Femmes à suivre"
      },
      {
        type: 'paragraph',
        content: "Linda, la sœur, sculptrice, est si discrète qu’elle refusait de montrer ses œuvres. « Elle les garde pour elle, par exemple ce pique-nique en béton, tout est en béton, les bouteilles de Coca, les verres, tout en béton, c’est formidable ! Tous les détails ! », s’étonnait Jane Birkin, en 2013, alors qu’elle présentait avec Gabrielle Crawford, le recueil de photographies que cette dernière lui avait consacré. Le livre était dédié à Kate Barry, fille de Jane et de John Barry. Kate, photographe, s’était défenestrée le 11 décembre 2013, « le jour même où ce livre partait à l’impression », était-il expliqué sur la page de garde."
      },
      {
        type: 'paragraph',
        content: "Jane Birkin et Gabrielle Lewis (nom de jeune fille de Gabrielle Crawford) figuraient ensemble, sans se connaître, dans le Daily Mail pour une photo de la « classe 64 » : une cinquantaine de femmes « à suivre », parmi lesquelles Nico et Marianne Faithfull… « Six mois après la photo du Daily Mail, j’ai passé une audition pour la comédie musicale Passion Flower Hotel, mise en musique par John Barry, Gabrielle aussi », racontait Jane. Ecartée, Gabrielle devient alors DJ au Pickwick Club, à Londres, dans le West End, une boîte où le Swinging London est en train de s’inventer."
      },
      {
        type: 'paragraph',
        content: "A l’époque de la minijupe, l’« attachement » des deux filles se noue grâce à leurs maris : le compositeur John Barry pour Jane Birkin, l’acteur et chanteur Michael Crawford pour Gabrielle Lewis. Les deux hommes et Jane figurent au générique de Passion Flower Hotel et du film Le Knack… et comment l’avoir, de Richard Lester, Palme d’or à Cannes en 1965."
      },
      {
        type: 'paragraph',
        content: "Il y a une autre photographie, prise le jour du baptême d’une des filles de Gabrielle, Lucy : « J’étais la marraine. Kate hurlait, elle m’avait vomi dessus, John Barry ne me parlait plus, voilà bien une petite affaire anglaise, bien cosy… » John Barry compose les bandes originales des films de James Bond (et plus tard d’autres, comme Danse avec les loups, de Kevin Costner) ; elle tourne Blow Up, d’Antonioni, Palme d’or à Cannes en 1967. Elle a 19 ans, Jeanloup Sieff la photographie pour Harper’s Bazaar. Elle est magnifique."
      },
      {
        type: 'subtitle',
        content: "« Chanson salace »"
      },
      {
        type: 'paragraph',
        content: "En 1967 toujours, Serge Gainsbourg traverse le Channel pour enregistrer Comic Strip, chanson inspirée par la BD Barbarella, de Jean-Claude Forest, avec une choriste anglaise. Il entreprend une épopée britannique qui trouvera son apothéose en 1971 avec Histoire de Melody Nelson. Entre-temps, il happe Jane Birkin, en plein Mai 68, sur le tournage de Slogan, de Pierre Grimblat. Elle lui apporte, dit-elle, « le féminin ». Elle, fille aux seins plats et à la silhouette androgyne, offre à un Gainsbourg qui se trouvait laid l’occasion d’être beau en portant des cheveux longs, des mocassins Repetto et des « bijoux de marquise »."
      },
      {
        type: 'paragraph',
        content: "Un an plus tard, l’Angleterre est scandalisée, comme la France et le Vatican, par Je t’aime… moi non plus, soupirante mélopée, duo amoureux inégalé, initialement enregistré par Brigitte Bardot, dont Gainsbourg était tombé amoureux au préalable. « J’ai dû faire de la peine aux Anglais, à mes parents aussi », expliquait Jane, experte en sentimentalité fébrile. La chanson l’a rendue célèbre dans le monde entier, et lui a sans cesse collé aux basques, notamment outre-Manche, où les journalistes les plus sérieux (ceux de la BBC) ne pouvaient, disait-elle, s’empêcher de lui poser des questions « énervantes » : « Quand allez-vous refaire another dirty song, une autre chanson salace ? Je sais que, quand je partirai les pieds devant, ils joueront Je t’aime… moi non plus. »"
      },
      {
        type: 'paragraph',
        content: "Birkin chantait, Birkin vivait, elle était aussi comédienne et adorait le cinéma. En 1969, elle est à l’affiche de La Piscine, de Jacques Deray, un huis clos avec Romy Schneider, Alain Delon et Maurice Ronet. Et deviendra une vedette populaire en France, en jouant notamment une « ravissante idiote » aux côtés de Pierre Richard dans La moutarde me monte au nez (1974). Entre-temps, elle fait une pause dans sa carrière en 1971, après la naissance de Charlotte. En 1973, elle est l’amante fascinée et filiforme d’une Brigitte Bardot toute en chair dans Don Juan ou si Don Juan était une femme, de Roger Vadim. En 1975, elle tient un des rôles principaux dans le premier film de Serge en tant que réalisateur, Je t’aime moi non plus – ambiguïté sexuelle et sodomie violente au programme."
      },
      {
        type: 'paragraph',
        content: "Avec Serge, elle hante le Palace, haut lieu du noctambulisme parisien des années 1980. Elle aime Gainsbourg « parce qu’il pouvait écouter Grieg l’après-midi et parler avec Patrick Sébastien à 20 h 30 ». Elle voit en lui un Petit Prince effarouché, dandy détaché, personnage de comédie musicale à la Sondheim ou à la Gershwin, initiateurs d’un cafard bleuté qu’elle adore. Puis vient l’époque « Gainsbarre », déglinguée, et ce n’est pas la sienne. Il boit, il délire, il est destroy, elle non. Elle le quitte en 1980 pour vivre avec le metteur en scène Jacques Doillon, avec qui elle fait un enfant, Lou, née en 1982, avant de tourner avec lui La Pirate, en 1984. Entre-temps, Gainsbourg, qui prépare le Pull Marine d’Adjani, lui offre un album, Baby Alone in Babylone – « Fuir le bonheur de peur qu’il ne se sauve »…"
      },
      {
        type: 'subtitle',
        content: "L’héritage Gainsbourg"
      },
      {
        type: 'paragraph',
        content: "Petite soldate de la mémoire, Jane Birkin a le sens du sacré. Elle a toujours été, artistiquement, la « légataire universelle » de Serge Gainsbourg, décédé le 2 mars 1991. Jane Birkin a enregistré sept albums « made in Serge Gainsbourg », des chansons écrites pour elle ou des reprises de son répertoire à lui, de Jane Birkin & Serge Gainsbourg (1969) à l’ultime et inoubliable Amours des feintes (1990). Elle passe de la Lolita gaie de La Gadoue à la mélancolique Jane B, en passant par l’aimable Di Doo Dah, l’Ex-fan des sixties ou le personnage plus épais des Dessous chics. Gainsbourg avait toujours envers elle le souci d’un certain « désabusé », disait-elle. En 1987, elle donne même un récital en solitaire au Bataclan. « Serge était là, avec son briquet, et Bambou [sa nouvelle épouse]. J’apprenais qu’on pouvait se faire plaisir. »"
      },
      {
        type: 'paragraph',
        content: "Veuve de la guerre ambiguë que Gainsbourg se livrait à lui-même, à la femme ou à la société, Jane Birkin n’envisage pas pendant longtemps l’infidélité artistique. Si des compositeurs la sollicitent, pour sa voix si wispy (de wisp, « mèche de cheveux », « filet de fumée »), elle refuse. En 1994, après une tournée française, elle jure qu’elle va cesser de chanter. Mais alors qui chanterait Gainsbourg ? Seule Zizi Jeanmaire, pour laquelle il avait écrit des chansons, vient de s’y risquer au Zénith, à Paris. Birkin est légaliste."
      },
      {
        type: 'paragraph',
        content: "Quand elle pense s’engager « dans Serge » une fois encore, elle veut reprendre « ses » chansons, celles de Baby Alone in Babylone, de Lost Song ou d’Amours des feintes, avec orchestre symphonique. Mais Philippe Lerichomme, le directeur artistique de Jane et Serge depuis les années 1970, l’avertit du danger de se répéter ou de racler les fonds de tiroirs."
      },
      {
        type: 'paragraph',
        content: "Il faut attendre six ans avant qu’elle n’ose. Elle publie, en 1996, Versions Jane, quinze reprises de chansons que Serge Gainsbourg avait écrites pour d’autres qu’elle, orchestrées par des musiciens aussi différents que Les Négresses vertes, Jean-Claude Vannier, Eddy Louiss, Doudou N’diaye Rose, Catherine Michel ou Joachim Kühn. Elle gagne du terrain sur les autres femmes : Catherine Deneuve, à qui elle chaparde Dépression au-dessus d’un jardin ; Françoise Hardy, dépossédée de Comment te dire adieu, avec la complicité d’une fanfare menée par Goran Bregovic ; Isabelle Adjani, frustrée en douceur du Mal intérieur."
      },
      {
        type: 'paragraph',
        content: "Et puisqu’il n’était pas dit qu’elle serait toute sa vie veuve de guerre, elle trahit frontalement, en 1999, avec l’album A la légère, écrit par Miossec, Françoise Hardy, Alain Souchon, MC Solaar… Dans la même veine, ce sera ensuite Rendez-vous (des duos, en 2004), Fictions (2006, avec Beth Gibbons, la voix de Portishead, Neil Hannon de Divine Comedy, etc.), Enfants d’hiver (2008), Oh ! Pardon tu dormais… (2020), qu’elle écrit."
      },
      {
        type: 'subtitle',
        content: "Actrice « crédible »"
      },
      {
        type: 'paragraph',
        content: "Elle avait du vague à l’âme, sûrement. Quelques regrets. Celui d’avoir été une actrice tardive, « en 1984 », dit-elle, dans La Pirate, le film de Jacques Doillon, puis dans La Fausse Suivante, mis en scène en 1985 par Patrice Chéreau. Révélée comme actrice « crédible », disait-elle, dans La Fille prodigue, de Doillon, en 1981. « C’était la première fois qu’une personne tournant des films dits “intellectuels” pensait à moi. Jacques Doillon était un réalisateur de films qui n’était pas intéressé à me voir sans mes vêtements. Il m’a dit : “Je vous veux boutonnée jusqu’au cou, je veux savoir ce qui se passe dans votre tête et je veux que vous fassiez une crise de nerfs.” » Elle tourne ensuite avec Jacques Rivette, James Ivory, Alain Resnais ou Jean-Luc Godard. Agnès Varda lui consacre un long-métrage, Jane B. par Agnès V. Birkin a tourné son premier long-métrage de cinéma en tant que réalisatrice en 2007, Boxes, qui réunit Geraldine Chaplin, Natacha Régnier et sa fille Lou Doillon."
      },
      {
        type: 'paragraph',
        content: "Avec son mélange de séduction et d’intelligence, sa facilité à étaler ses sentiments sous des dehors pudiques, elle occupait une place à part dans la cartographie des stars françaises. Chanteuse, elle bénéficiait d’un capital sympathie que le cinéma, mais aussi le théâtre ont fait fructifier."
      },
      {
        type: 'paragraph',
        content: "En 1994, Jane part pour Londres. Le prétexte : honorer la mémoire de Serge Gainsbourg, pour un soir, au Savoy Theatre. Mené avec succès, ce Tribute to Serge rénove l’image, à l’époque très floue, de Gainsbourg outre-Manche. Surtout, il ramène Jane B. vers ses racines. Présent au Tribute to Serge, un agent artistique lui propose alors le rôle d’Andromaque dans The Women of Troy (Les Troyennes, d’Euripide), mis en scène par Annie Castledine au National Theatre."
      },
      {
        type: 'paragraph',
        content: "Birkin est une « femme à la beauté folâtre », écrit quelques mois plus tard le critique Richard Williams, dans The Independent : l’article était intitulé « Return of the Native » (« le retour de la fille du pays »). « Elle a gardé sa beauté (…), ajoute-t-il, personne peut-être ne la reconnaîtra dans les rues de Londres, comme elle l’a souvent remarqué après tant d’années d’exil. Mais en aucun cas elle ne peut passer inaperçue. » En 1999, elle joue Oh ! Pardon tu dormais, mis en scène par Xavier Durringer, sur un texte qu’elle avait écrit en 1992 – dont elle reprend le titre pour son album coécrit avec Etienne Daho en 2020. En 2005 et 2006, elle joue également Sophocle et Shakespeare en France et en Grande-Bretagne."
      },
      {
        type: 'subtitle',
        content: "Birkin, la combattante"
      },
      {
        type: 'paragraph',
        content: "Jane Birkin a souvent habillé, déshabillé les œuvres de Serge, « poète majeur », qu’elle interprète depuis 1969. La séparation, la mort, la collaboration avec d’autres n’y ont rien fait : Jane a continué de porter les chansons de son compagnon de vie et d’art, qu’elles aient été créées lorsqu’ils vivaient ensemble ou lorsque la force de leur lien perdurait au-delà des conflits."
      },
      {
        type: 'paragraph',
        content: "« C’est un privilège que l’un des plus grands auteurs français ait écrit pour moi de mes 20 ans jusqu’à mes 45 ans. Voilà, ça n’a jamais cessé. C’est une situation étrange. Qu’est-ce que je peux faire pour lui maintenant, alors que tout est trop tard ? Au moins, je peux le porter, l’emmener. Dire ses mots ! », expliquait-elle en 2017, alors qu’elle préparait la sortie d’un Gainsbourg symphonique."
      },
      {
        type: 'paragraph',
        content: "En 1999, elle avait créé en scène Arabesque : elle y passait à la moulinette orientale les chansons de Gainsbourg avec la complicité du violoniste algérien Djamel Benyelles, leader du groupe Djam & Fam. Le spectacle tourne alors dans le monde entier, plus de deux cents dates, trente pays, avant la sortie d’un album en 2002. Birkin en fait un manifeste pour le croisement des cultures et diffuse l’idée d’un Gainsbourg heureusement cosmopolite. C’était Birkin la combattante."
      },
      {
        type: 'paragraph',
        content: "Son site Web a longtemps affiché ses préférences, celle de la lutte d’abord, avec un onglet dédié, intitulé « Mes engagements » : sauver Aung San Suu Kyi, ou la Tchétchénie. Elle était aussi partie à Sarajevo, en 1994, pour offrir des livres, en signe de protestation contre le « nettoyage ethnique opéré par les Serbes ultranationalistes ». Elle y a retrouvé « la fierté, la hauteur, la même que celle dont me parlait Jacqueline, la sœur de Serge : en pleines persécutions nazies, les parents Ginzburg exigeaient qu’elle aille prendre ses leçons de piano, quitte à faire 10 kilomètres à pied »."
      },
      {
        type: 'paragraph',
        content: "En 2002, elle donne Arabesque à Moscou. « C’était très important, car Serge était de famille russe. C’était avant l’assassinat de la journaliste Anna Politkovskaïa, en 2006. J’ai dédié ce spectacle aux Tchétchènes, mais c’était très délicat, parce que les mères de soldats russes qui avaient combattu les Tchétchènes étaient venues me voir dans ma chambre d’hôtel pour me raconter la guerre, les bizutages, etc. » A Sarajevo, il était facile de choisir son camp, concluait-elle, « pas à Moscou ». Et quand elle ne souriait plus, Jane Birkin avait l’œil ébahi et ému, grand ouvert."
      },
      {
        type: 'paragraph',
        content: "Dix ans plus tard, elle conçoit Via Japan, avec des musiciens japonais, puis Birkin/Gainsbourg, le symphonique, vingt-quatre chansons arrangées par le pianiste, compositeur et chef d’orchestre Nobuyuki Nakajima. Une aventure qui commence au Japon en 2011, quelque temps après la catastrophe du tsunami et de la centrale nucléaire de Fukushima. Le Japon avait accueilli Serge et Jane, puis Jane en solo, avec un amour passionnel de la chanson française. Jane part donner deux concerts de soutien dans ce pays meurtri, « qui vit sur une faille et le sait. Le peuple japonais vit avec cette étrangeté, courageusement, il a cultivé la beauté de l’éphémère, des plats très jolis, qui disparaissent quand tu les manges, des compositions de fleurs »."
      },
      {
        type: 'paragraph',
        content: "En 2014, affaiblie par une leucémie, elle avait poursuivi une tournée intitulée Gainsbourg, poète majeur, où elle lisait les textes de Serge, en compagnie de ses amis Michel Piccoli et Hervé Pierre, acteur de la Comédie-Française. Exténuée, portée en scène par un homme de confiance, elle n’avait jamais désarmé, toujours telle qu’en elle-même, et finalement insondable. Une œuvre exploratoire et intime que Jane B. avait poursuivie en 2020, traçant de son timbre fragile la violence du déclin amoureux, exorcisant aussi le drame de la mort de sa fille (Cigarettes, Ces murs épais) et ses graves problèmes de santé (Telle est ma maladie envers toi)."
      },
      {
        type: 'paragraph',
        content: "La tournée Oh ! Pardon tu dormais… fut empêchée par les confinements et restrictions dus à l’épidémie de Covid-19. Le spectacle fut enfin créé en mai 2021 avec Etienne Daho, après une résidence, aux Scènes du Golfe de Vannes. Jane Birkin reprit la route en autrice, n’oubliant pas pour autant son rôle d’interprète en reprenant, de-ci de-là, le spectacle Birkin/Gainsbourg le symphonique."
      },
      {
        type: 'paragraph',
        content: "Courageuse toujours, présente à jamais malgré de nombreuses annulations de concerts pour cause de santé en zigzag – assaut microbien, accident vasculaire cérébral… Jane, entière, sans fard, ne déguisa pas sa mine boursouflée lors de la cérémonie des Césars du cinéma en février 2023. Elle y était heureuse, en mère indéfectible, venue soutenir sa fille Charlotte, réalisatrice du documentaire Jane par Charlotte, portrait croisé pudique, esquissé à force de petits riens qui font le sel de la vie et les bases de l’amour."
      },
    ],
  },
]

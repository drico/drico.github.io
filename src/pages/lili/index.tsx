import { Box } from "@mui/material";

const text = `Ma mère m'a affirmé à plusieurs reprises que Lior lui faisait peur, notamment car celui-ci l'intimidais en affirmant qu'il serait prêt à utiliser sa force dans le cas où ma mère lui interdirait de sortir.

Je témoigner également d'avoir plusieurs fois entendu ma mère pleurer au téléphone car Lior était insupportable.
Il ne respectait rien, notamment les heures de couvre feu. Celui-ci empêche régulièrement la famille de dormir en faisant beaucoup de bruit.
Il a plusieurs fois affirmé qu'il était désolé, qu'il essaierai de faire preuve de respect, mais cela n'a jamais duré.

Étant donné que Lior ne respectais pas les règles concernant son utilisation problématique de son téléphone, et étant moi même ingénieur en informatique, j'ai pris la responsabilité de gérer le contrôle parental de son téléphone.
J'ai pu constater à maintes reprises que Lior tentais tout ce qu'il pouvait pour contourner ce contrôle parental.
Par exemple avec de l'intimidation : Le 18 novembre à 15h15 par sms : "[...] je vais trouver une autre alternative [...] je te le dis juste" après que je lui ai expliqué quelles règles de contrôle parental j'allais mettre en place, et pourquoi.
Ou des tentatives incessantes de négiciation, avec toutes les autorités disponibles, notamment jusqu'à qu'il arrive à convaincre ma mère de me demander de changer les règles (chose que j'ai refusé afin d'asseoir l'autorité). Malgré cela, il contournai les restrictions en récupérant le soir d'autres téléphones dans la maison (notamment celui de mon père, qui a fini par céder tellement Lior le fatiguais) afin d'échaper à tout contrôle possible de ma part.


Le 25 décembre, devant toute la famille, après une petite démonstration de karaté de ma part, Lior a voulu me montrer une technique d'étranglement. Celui-ci n'a pas hésiter à m'étrangler très fortement (j'étouffais) pendant plus de 20 secondes malgré le fait que je me débattais pour demander l'arrêt. J'ai compris que Lior tentais de me domminer et j'ai du par la suite reprendre physiquement le dessus afin d'affirmer mon autorité (sans pour autant l'étouffer bien sûr).

J'ai appris également le 25 décembre que Lior s'était créé un compte bancaire sur la plateforme Revolut (de mémoire). Je lui ai expliqué qu'un enfant n'étais pas censé se créer lui même un compte et j'ai demandé des explications. Il m'a affirmé qu'il avait utilisé la carte d'identité de ma mère. Je lui expliqué qu'en aucun cas il n'avait le droit de faire ça, que le compte appartenait donc légalement à ma mère, qu'il s'agissait d'une usurpation d'identité et que cela était répréhensible pénalement. Lior s'est contenté de me dire qu'il l'avait fait parce qu'il était mineur et qu'il n'avait pas d'autre façon de le faire. Celui-ci a part la suite continué à montré son inconsidération totale des lois. Pour lui, si une loi ne lui plait pas, alors il n'a pas à la respecter, et si il arrive à la contourner, alors il se pense dans la légalité, ou du moins, il trouve cela convenable.
Il l'a d'ailleurs dit très clairement au sujet des règles de contrôle parental. Je crois ne pas déformer son propos lorsqu'il a affirmé, devant toute la famille, que "ma règle était trop stricte selon lui et qu'il n'avait donc ni à l'accepter, ni à la suivre".

Plus tard, ma mère m'a aussi dit qu'il sortait sans demander la permission, que parfois il ne rentrait pas le soir parce qu'il avait décider d'aller chez son ami, et qu'il argumente autant qu'il le peut pour refuser de rentrer.

Je peux également témoigner que son utilisation très problématique du téléphone n'est pas récent. En effet, j'ai eu l'occasion d'être le maître de stage de Lior en Octobre 2024. J'ai pu constater que Lior passait la quasi totalité de son temps sur son téléphone malgré mes demandes incessantes du type "met ton téléphone dans ta poche". J'ai d'ailleurs fini par lui confisquer et à inscrire ce problème cela dans son rapport de stage.
Même quand son téléphone était éteint, je constatais  que Lior appuyais frénétiquement sur les boutons du téléphone. Cela m'a beaucoup inquiété, moi ainsi que mes collègues.



Je constate donc que Lior provoque volontairement toutes les formes d'autorités car il se crois en droit d'obtenir tout ce qu'il désire, quitte à pousser à bout mes parents. Je ne doute pas une seconde qu'il ai également poussé à bout ma soeur et son conjoint et ce, sur le long terme. Et je comprend donc tout à fait que, malheureusement, ceux-ci aient pu être parfois dépassés et aient pu répondre physiquement à la pression que Lior leur impose.
Je suis également convaincu que Lior ai tout à fait pu amplifier volontairement les faits lors de ses témoignages.
Je suis également convaincu que les différentes tensions chez sa familles étaient très fortement dûes au comportement de Lior qui ont pu s'envenimer et déborder sur l'ensemble des membres de la famille.
Pour cela, je me permet d'insister sur le fait que recommande sans aucune réserve la possibilité aux 4 frères et soeurs de Lior de retourner chez leurs parents.
`;

const Lili = () => {
  return (
    <Box sx={{p:4}}>
      {text.split("\n").map((line, i) => (
        <>
          <Box key={i}>
            {line}
            <br />
          </Box>
        </>
      ))}
    </Box>
  );
};

export default Lili;

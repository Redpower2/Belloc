import { ChatInputCommandInteraction } from "discord.js";
import { numeroRandom } from "../../../utils/general/numeroRandom";

const defolt = [
    "Quiero tetas.", 
    "¿Qué significa el bro respeta?", 
    "https://images-ext-1.discordapp.net/external/tILJSgZwXWhAkf9YFqesd7o0tXSEaXmBEHgp7qsXILA/https/www.unbosque.edu.co/sites/default/files/2025-04/Facultad.gif", 
    "Cállate.", 
    "Os follaré con la polla", 
    "Ha llegado el momento de que busques el camino. Tu alma te ha puesto frente a frente con la luz clara, y ahora estás a punto de experimentarla en toda su realidad, donde todas las cosas son como el vacío y el cielo despejado, y el intelecto desnudo e inmaculado es como un vacío transparente, sin circunferencia ni centro. En este instante, conócete a ti misma y permanece en ese estado... Mira hacia la luz. Encuentra la luz.",
    "No, no lo sé. Hablas boludeces. Te repito, conozco muchas minas y ninguna se me caga de risa. Los que me descansan son boluditos como vos, gordos PC. Y la supuesta foto pija es fake, no existe foto pija mía por qué nunca me saque una. Y no, no soy ningún domado por la concha.",
    "Ya que nadie le dice la verdad al dogor, lo voy a hacer yo o que alguien se lo haga llegar: Che, amigo acá todos sabemos que tenes problemas psicológicos, no es necesario que nos lo recuerdes todo el tiempo, es más, ya tus dificultades llegaron a un punto en que la gente se ríe por no llorar. Pensé que ya la habías cortado con el tema de la mina esa, pero se ve que tu tiempo en Arkham no sirvió de mucho (porque los tacaños de tus viejos decidieron no gastar la poca guita que tienen en un loquero), y seguís usando cuentas paralelas para acosar a una mina que nunca va a darte cabida pero no podes o no queres aceptarlo. Encima tampoco tenés un laburo ni una actividad fija, a tus viejos les hiciste pagar una cuota de un año en el gimnasio pero solo fuiste un par de veces, y ni siquiera cuando tuviste la posibilidad de laburar lo hiciste porque sos re vago, tus viejos te siguen manteniendo con 30 años y vos les seguís haciendo la vida imposible con tus dificultades. ¿Qué vas a hacer cuando se mueran?... ¿Cómo y te vas a sostener ahí? ¿Pagar la luz, el gas, tu WIFI y tu pensión por discapacidad? ... Tanto que querías 'trabajar, tener una mujer que te ame y ser exitoso' pero en 30 años no te fuiste de la casa de tus viejos y seguiste sin cumplir tus deseos de tu cumple de 20 años. El ego en las nubes pero el sentido común en el piso, eso es lo que tenes. Y hasta que no lo aceptes vas a seguir en el mismo bucle. Cuidate y espero que reflexiones.",
    "NO CHUPEN SU PROPIA PIJA  NO se siente como si te chuparan la pija SE SIENTE como si estuvieras chupando una pija  REPITO, NO SE AUTOCHUPEN LA PIJA",
    "que haces pelotudo de mierda ahí embolado como un conchudo si queres pasarla bien pelotudo vení al bosque la re concha de tu madre la vas a pasar re bomba todas putas todos putos y la mejor música que pone el boludo del pino no seas conchudo la re concha de tu madre y vení este y todos los sábados al bosque está lleno de forros y el dueño es un puto del orto cara de ojete conchudo de mierda hasta cuando vas a tener esa cara de mierda por qué no venís al bosque forro pelotudo tengo que andar hablando boludeces para convencerte que este boliche del orto es el mejor de la tierra no ves que es una poronga atada del ojete lleno de forros que se creen lindos y son unos reverendos hijos de re mil puta y las trolas con el orto caído y las tetas flacidas que no se dejan tocar el ojete dale la re puta que te re mil parió levanta el ojete de ahí y vení para el bosque con los forros de tus amigos y la puta de tu novia",
    "En momentos donde millones de argentinos la están pasando mal, con inflación, hambre, despidos y represión a los que reclaman dignidad, usar el sufrimiento del pueblo para hacer chistes es lamentable. Más cuando los que hoy hablan de “hiperinflación” y “ñoquis” son los mismos que siempre estuvieron del lado del poder económico: Bullrich, Caputo, Sturzenegger y toda esa casta que hundió al país una y otra vez.  El peronismo no es un juego. Es trabajo, justicia social y soberanía nacional. Es el único movimiento que siempre defendió al pueblo y que, aún con errores, nunca se arrodilló ante los poderosos. Ojalá el creador de esto lea un poco más de historia y entienda de qué lado de la vereda está cada uno.  Steam debería tener más criterio antes de publicar contenido así. Y vos, pibe, usá tu talento para crear algo que construya, no para repetir el discurso del odio.  Esto es lo que pregona la derecha, el odio.",
    "Soy homofobico. No en el sentido de odiar a los gays porque los respeto y me parecen buenas personas los pocos que he conocido. Pero no puedo evitar sentir rechazo y miedo al ver interactuar 2 hombres homosexuales. Escucharlos besarse es como escuchar un buitre comiéndose un cuerpo en la ruta, no puedo estar junto a gays porque me podría volver loco al poco rato de escucharlos hablar siquiera. Esto me pasa desde chico, nunca realmente pude sanar esa incomodidad que tengo al siquiera tener uno cerca. ¿Qué hago? ¿Se lo debería consultar a mi novio?",
    `Para mi hay usuarios que valen menos que otros. Hay usuarios que valen mas miembros porque son gente que invita y crea cosas en el server para que la gente se quede. Pero luego hay usuarios que valen miembros negativos. Gente que es re toxica en ⁠╭⌲『💬』general y provoca que la gente no le guste estar. Despues si les dices a un admin lo que esa gente esta haciendo, el te dira "Pero lo dijo en joda. No era obvio?" but ya es demaciado tarde para decir que era joda y el user que molestaron ya se fue del server.`,
    "El sexo anal es misógino. Como hombre, he pensado mucho en esto porque siempre me fascinó que esto sea algo que le interese a la gente. Finalmente caí en cuenta de que las parejas heterosexuales que practican sexo anal básicamente están participando en un acto de misoginia. Claro, me refiero a cuando un hombre se lo hace a una mujer. Es una mentira común que las mujeres pueden tener sexo anal como receptoras y obtener placer. Esto es perpetuado por la mentalidad misógina de que las mujeres deben ser sumisas. Es forzarla a ser vulnerable y sumisa solo para alimentar su ego. Por lo tanto, es misógino. No puedo creer que tenga 23 años y recién me estoy dando cuenta de esto.",
    "No... melisa. Todo se terminó de esta manera, no puedo creer que me traicionaste de esta manera, lo juro. YO CONFIÉ EN VOS, NO SÉ POR QUÉ ME HICISTE ESTO LO JURO. Te juro que no lo puedo creer, pero no sé por qué me cagaste de esta manera. ¡Fuiste la única persona que le tuve tanta confianza, y no sé! Ya no voy a poder mirar a la gente igual. No sé por qué me hiciste esto, si yo no te hice nada malo. ¿Por qué no me dijiste al principio que me ibas a hacer esto? ¿Por qué no desconfié? ¿Por qué fui tan confiado en alguien? ¿Por qué te tuve que amar tanto? Juro que pensé que, que podía cambiar mi vida una linda chica hablándome y todo parecía tan lírico. ¡Y mirá lo que me hiciste! ¡Todo se arruinó, todo!",
    "DEVUELVANME MIS 2 EMPRESAS DEVUELVANME, TODO LO QUE ME ROBARON USTEDES 2 DEVUELVANMELO ME ROBARON TAHIS Y PABLO ME ROBARON ME ROBARON MIS EMPRESAS TODO MI SUDOR COMIERON CON MI SUDOR ELLOS 2 GENTE TIPAS-TIPOS... ESTOY MAL AYUDENME ME ROBARON ELLOS 2 PABLO Y TAHIS TAHIS Y PABLO",
    ""
];

//me da miedo que me reporten el bot o que raideen con él, yo dejaria hacer quilombo eh
const filtro = ["http", "@", "nigger", "nazi", "hitler", "nigga", "fag", "foid", "cp", "infantil", "judío", "judio"]


export async function execute(interaction: ChatInputCommandInteraction)
{
    const dicho = interaction.options.getString("dicho");
    if(dicho)
    {
        const dichito = dicho.toLowerCase()
        if(filtro.some(palabra =>  dichito.includes(palabra)))
        {
            return await interaction.reply({
                content: "Yo soy un tipo educado, no voy a repetir esas cosas."
            });
        }
        return await interaction.reply({
            content: dicho
        });
    }
    else
    {
        const random = numeroRandom(defolt.length);
        return await interaction.reply({
            content: defolt[random]
        });
    }
}
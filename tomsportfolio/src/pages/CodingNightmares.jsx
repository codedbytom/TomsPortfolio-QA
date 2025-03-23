import Layout from '../components/Layout';
import NightmareCard from '../components/NightmareCard';
import { nightmares } from '../data/nightmares';
export default function CodingNightmares() {
    return (
        <Layout>
            <h1 className="">Tom's Coding Nightmares</h1>
            <ul>
                <li><a href="#demo-crunch">🔥 The Demo Crunch</a></li>
                <li><a href="#legacy-nightmare">💾 Legacy Code Horror</a></li>
                <li><a href="#ghost-bugs">👻 The Ghost Bug</a></li>
            </ul>
            {nightmares.map(n => (
                <NightmareCard key={n.id}
                    title={n.title}
                    summary={n.summary}
                    solution={n.solution}>

                    {n.content.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}

                </NightmareCard>
            ))}

            {/*<NightmareCard title="Symptoms of A Down System" summary="A previous employer's solution for dealing with an unresponsive website for clients and internal users.">*/}
            {/*    <p>Hired on full time for this company, their first internal dev hire. Always have used contractors to create and deal with their internal systems.</p>*/}
            {/*    <p>Their lead business person hands me this word document and explains to me what needs to be done if employees or clients complained about spinning when using the websites.</p>*/}
            {/*    <p>So it went something like this, if there was reports of spinning, the first steap was to recyle the app pool in IIS, meaning you had to remote into the production application server and recyle them.</p>*/}
            {/*    <p>If that didn't work, restart IIS</p>*/}
            {/*    <p>If that didn't work, restart SQL Server on the database servers</p>*/}
            {/*    <p>If everyone was still complaining? The Hail Mary, restart all the servers.</p>*/}
            {/*</NightmareCard>*/}
        </Layout>
    );
}
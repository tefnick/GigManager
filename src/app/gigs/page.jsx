import { prisma } from "@/lib/prisma";
import Gig from "@/components/gigs/Gig";

async function getGigs() {
    return await prisma.gig.findMany({
        where: {
            date: {
                gte: new Date() // initializes to current date
            }
        },
        include: {
            venue: true,
            lineup: {
                select: {
                    name: true,
                }
            }
        }, 
        orderBy: {
            date: 'asc'
        }
    });
}

export default async function GigsPage() {
    const gigs = await getGigs();
    
    return (
        <>
            <h1 className="flex justify-center font-bold text-2xl mt-6 mb-6">Gigs</h1>
            {gigs.length === 0 && <p className="text-center">No upcoming gigs</p>}
            <ul>
                {gigs.map((gig) => (
                    <Gig key={gig.eventId} {...gig} />
                ))}
            </ul>
        </>
    );
}
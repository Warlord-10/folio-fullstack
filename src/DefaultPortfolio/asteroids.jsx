import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

function ColorLuminance(hex, lum) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    lum = lum || 0;
    let rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}
function randomColor() {
    const hex = "#111111";
    const lum = 2 + Math.random() * 10;
    return ColorLuminance(hex, lum);
}

const CreateRock = ({ size, position, detail=0 }) => {
    const asteroid = useRef(null);
    useEffect(() => {
        if (asteroid.current) {
            const pos = asteroid.current?.geometry.attributes.position;
            const vertices = pos.array;
            const bypass = [];

            for (let i = 0; i < vertices.length / pos.itemSize; i++) {
                // if (bypass.indexOf(i) > -1) continue;

                const currX = pos.getX(i);
                const currY = pos.getY(i);
                const currZ = pos.getZ(i);
                const x = currX + (0 - Math.random() * (1 / 3));
                const y = currY + (0 - Math.random() * (1 / 3));
                const z = currZ + (0 - Math.random() * (1 / 3));

                pos.setX(i, x);
                pos.setY(i, y);
                pos.setZ(i, z);

                for (let j = 0; j < vertices.length; j += 3) {
                    if (
                        vertices[j] === currX &&
                        vertices[j + 1] === currY &&
                        vertices[j + 2] === currZ
                    ) {
                        asteroid.current.geometry.attributes.position.array[
                            j
                        ] = x;
                        asteroid.current.geometry.attributes.position.array[
                            j + 1
                        ] = y;
                        asteroid.current.geometry.attributes.position.array[
                            j + 2
                        ] = z;
                        bypass.push(j / 3);
                    }
                }
            }
        }
    }, [])
    useFrame((state, delta) => {
        asteroid.current.rotation.x -= delta / 5;
        asteroid.current.rotation.y -= delta / 5;
    })
    return (
        <mesh receiveShadow castShadow position={position} ref={asteroid}>
            <dodecahedronGeometry args={[size, detail]} />
            <meshStandardMaterial color={randomColor()} roughness={0.8} metalness={1}/>
        </mesh>
    )
};

export default CreateRock;
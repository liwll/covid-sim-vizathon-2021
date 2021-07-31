function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
}


function resolveCollision(circle, otherCircle) {
    const xVelocityDiff = circle.velocity.x - otherCircle.velocity.x;
    const yVelocityDiff = circle.velocity.y - otherCircle.velocity.y;

    const distX = otherCircle.x - circle.x;
    const distY = otherCircle.y - circle.y;

    // Prevent accidental overlap of circles
    if (xVelocityDiff * distX + yVelocityDiff * distY >= 0) {

        // Grab angle between the two colliding circles
        const angle = -Math.atan2(otherCircle.y - circle.y, otherCircle.x - circle.x);

        // Store mass in var for better readability in collision equation
        const m1 = circle.mass;
        const m2 = otherCircle.mass;

        // Velocity before equation
        const u1 = rotate(circle.velocity, angle);
        const u2 = rotate(otherCircle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap circle velocities for realistic bounce effect
        circle.velocity.x = vFinal1.x;
        circle.velocity.y = vFinal1.y;

        otherCircle.velocity.x = vFinal2.x;
        otherCircle.velocity.y = vFinal2.y;
    }
}

export { resolveCollision }; 
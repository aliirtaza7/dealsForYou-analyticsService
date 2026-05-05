const LAMBDA = 0.1;
export function getDecayFactor(lastEventAt, now = new Date()) {
    const diffMs = now.getTime() - lastEventAt.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return Math.exp(-LAMBDA * diffHours);
}

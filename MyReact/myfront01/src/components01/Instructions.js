const Instructions = ({ title, steps }) =>
    <section className="instructions">
        <h2>{title}</h2>
        {steps.map((s, i) =>
            //s는 step을 말함. 
            <p key={i}>{s}</p>
        )}
    </section>

//Instructions.displayName = 'Instructions'

export default Instructions

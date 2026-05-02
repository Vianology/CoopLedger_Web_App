import Button from '../components/UI/Button/Button';
import { LogIn, Send, ArrowRight } from 'lucide-react';


function Vote(){
    return(
        <div>
            <Button 
            variant="primary" 
            size="lg" 
            icon={LogIn} 
            iconPosition="right"
            onClick={() => {}}
            >
                Se connecter
            </Button>

            <Button 
            variant="secondary" 
            size="full" 
            isLoading={true}
            >
                Chargement...
            </Button>
        </div>
    )
}

export default Vote

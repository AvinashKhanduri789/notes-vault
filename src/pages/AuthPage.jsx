import { useState } from "react";
import AuthForm from "../components/AuthForm";
import SimpleDialog from "../components/SimpleDialog";
import { socialSignIn, signInWithEmailAndPassword, createAccount } from "../lib/supabase";

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [mode, setMode] = useState('signin');


    const [dialog, setDialog] = useState({
        isVisible: false,
        message: '',
        type: 'info'
    });

    const showDialog = (message, type = 'info') => {
        setDialog({
            isVisible: true,
            message,
            type
        });
    };

    const hideDialog = () => {
        setDialog({
            isVisible: false,
            message: '',
            type: 'info'
        });
    };

    const handleGoogleSignup = async () => {
        setIsGoogleLoading(true);
        try {
            await socialSignIn("google");
        } catch (error) {
            showDialog(error.message, 'error');
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const signUp = async () => {
        console.log("Sign up called");
        try {
            const { data, error } = await createAccount(email, password);
            if (error) {
                showDialog(error.message, 'error');
            } else {
                showDialog(
                    `Account created successfully. A verification email has been sent to ${email}. Please verify your email before logging in.`,
                    "success"
                );



            }
        } catch (error) {
            showDialog(error.message || 'An unexpected error occurred', 'error');
        }
    };

    const signIn = async () => {
        console.log("Sign in called");
        try {
            const { data, error } = await signInWithEmailAndPassword(email, password);
            if (error) {
                showDialog(error.message, 'error');
            } else {
                console.log("Sign in successful:", data);

                showDialog('Welcome back!', 'success');
            }
        } catch (error) {
            showDialog(error.message, 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Handle submit called -->", mode);


        setErrors({});


        if (!email || !password) {
            showDialog('Please fill in all fields', 'warning');
            return;
        }

        setIsLoading(true);

        try {
            if (mode === "signin") {
                await signIn();
            } else if (mode === "signup") {
                await signUp();
            }
        } catch (error) {
            showDialog(error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <>
            <AuthForm
                email={email}
                password={password}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}

                onSubmit={handleSubmit}
                onGoogleAuth={handleGoogleSignup}
                mode={mode}
                setMode={setMode}
                showGoogleButton={true}
                isLoading={isLoading}
                isGoogleLoading={isGoogleLoading}

                errors={errors}
            />

            {/* Dialog Component */}
            <SimpleDialog
                isVisible={dialog.isVisible}
                message={dialog.message}
                type={dialog.type}
                onClose={hideDialog}
                autoCloseDuration={dialog.type === 'success' ? 3000 : 5000}
            />
        </>
    );
};

export default AuthPage;
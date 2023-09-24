import { useState } from "react"
import { apis, storeTokenInLocalStorage } from "../../global/apis"
import { motion, LayoutGroup } from 'framer-motion';
import Loading from "@/app/component/loading";
import { useRouter } from 'next/navigation'


const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const router = useRouter()

	const handleSubmit = async () => {
		setLoading(true);
		const data = {
			method: 'post',
			url: '/auth/login',
			data: {
				email: email,
				password: password
			}
		}
		const result = await apis(data);
		console.log(result);
		if (result == undefined) {
			const pesan = "Internal Server Error, Harap Hubungi Developer!";
			setMessage(pesan);
			setShowAlert(true);
			setLoading(false);
		} else {
			if (result.data.code >= 200 && result.data.code <= 299) {
				storeTokenInLocalStorage(result.data.data.accessToken)
				router.replace('/dashboard');
			} else {
				const pesan = (typeof result.data.message !== 'undefined') ? result.data.message : result.data.error[0].message;
				setMessage(pesan);
				setShowAlert(true);
				setLoading(false);
			}
		}
	}

	const show = {
		opacity: 1,
		display: "block"
	};

	const hide = {
		opacity: 0,
		transitionEnd: {
			display: "none"
		}
	};
	return (
		<div className="container mx-auto px-4 h-full">
			{loading ? <Loading /> : null}
			<div className="flex content-center items-center justify-center h-full">
				<div className="w-full lg:w-1/2 px-4">
					<motion.div
						initial={{ opacity: 0 }}
						animate={showAlert ? show : hide}
						transition={{ duration: 0.5 }}
					>
						<div
							className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"
						>
							<span className="text-xl inline-block mr-5 align-middle">
								<i className="fas fa-bell" />
							</span>
							<span className="inline-block align-middle mr-8">
								<b className="capitalize">Failed!</b> {message}!
							</span>
							<button
								className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
								onClick={() => setShowAlert(false)}
							>
								<span>×</span>
							</button>
						</div>
					</motion.div>
				</div>
			</div>
			<div className="flex content-center items-center justify-center h-full">
				<div className="w-full lg:w-4/12 px-4">
					<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
						<div className="rounded-t mb-0 px-6 py-6">
							<div className="text-center mb-3">
								<h6 className="text-blueGray-500 text-sm font-bold">
									Sign in with
								</h6>
							</div>
							<div className="btn-wrapper text-center">
								<button
									className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
									type="button"
								>
									<img alt="..." className="w-5 mr-1" src="/img/github.svg" />
									Github
								</button>
								<button
									className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
									type="button"
								>
									<img alt="..." className="w-5 mr-1" src="/img/google.svg" />
									Google
								</button>
							</div>
							<hr className="mt-6 border-b-1 border-blueGray-300" />
						</div>
						<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
							<div className="text-blueGray-400 text-center mb-3 font-bold">
								<small>Or sign in with credentials</small>
							</div>
							<form>
								<div className="relative w-full mb-3">
									<label
										className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
										htmlFor="email"
									>
										Email
									</label>
									<input
										id='email'
										type="email"
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
										placeholder="Email"
									/>
								</div>

								<div className="relative w-full mb-3">
									<label
										className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
										htmlFor="password"
									>
										Password
									</label>
									<input
										id='password'
										onChange={(e) => setPassword(e.target.value)}
										value={password}
										type="password"
										className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
										placeholder="Password"
									/>
								</div>
								<div>
									<label className="inline-flex items-center cursor-pointer">
										<input
											id="customCheckLogin"
											type="checkbox"
											className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
										/>
										<span className="ml-2 text-sm font-semibold text-blueGray-600">
											Remember me
										</span>
									</label>
								</div>

								<div className="text-center mt-6">
									<motion.button
										onClick={handleSubmit}
										whileHover={{ scale: 1 }}
										whileTap={{ scale: 0.9 }}
										transition={{ type: "spring", stiffness: 400, damping: 17 }}
										className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
										type="button"
									>
										Sign In
									</motion.button>
								</div>
							</form>
						</div>
					</div>
					<div className="flex flex-wrap mt-6 relative">
						<div className="w-1/2">
							<a
								href="#pablo"
								onClick={(e) => e.preventDefault()}
								className="text-blueGray-200"
							>
								<small>Forgot password?</small>
							</a>
						</div>
						<div className="w-1/2 text-right">
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;
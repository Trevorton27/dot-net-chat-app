--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

-- Started on 2021-12-10 13:41:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3009 (class 0 OID 26045)
-- Dependencies: 202
-- Data for Name: Channels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Channels" ("Id", "ChannelName") FROM stdin;
1	Introduce Yourself
2	Mindset
3	Coding
4	Share Your Portfolio
5	Landing Your First Job
6	Recommended Reading
\.


--
-- TOC entry 3011 (class 0 OID 26055)
-- Dependencies: 204
-- Data for Name: Messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Messages" ("Id", "UserId", "Text", "CreatedAt", "ChannelId", "Username") FROM stdin;
1	1	Can anybody see this?	0001-01-01 00:00:00	1	TrevTheDev \n
2	1	heyo	0001-01-01 00:00:00	1	TrevTheDev
3	1	heyo again	0001-01-01 00:00:00	1	TrevTheDev
4	1	hi from introduce yourself	0001-01-01 00:00:00	1	TrevTheDev
5	1	hi	0001-01-01 00:00:00	1	TrevTheDev
6	1	hi again	0001-01-01 00:00:00	1	TrevTheDev
7	1	yackity shmackity	0001-01-01 00:00:00	2	TrevTheDev
8	1	I said a hey now	0001-01-01 00:00:00	2	TrevTheDev
9	1	hi	0001-01-01 00:00:00	2	TrevTheDev
10	2	Hi from coding.	0001-01-01 00:00:00	3	Trey
11	2	Hi again.	0001-01-01 00:00:00	3	Trey
12	2	yo	0001-01-01 00:00:00	3	Trey
13	2	hey you guys!	0001-01-01 00:00:00	3	Trey
14	2	send a message	0001-01-01 00:00:00	2	Trey
15	2	a new message	0001-01-01 00:00:00	4	Trey
16	2	afsadfad	0001-01-01 00:00:00	4	Trey
17	2	new message	0001-01-01 00:00:00	4	Trey
18	2	hi	0001-01-01 00:00:00	1	Trey
19	2	hi	0001-01-01 00:00:00	1	Trey
20	2	hi	0001-01-01 00:00:00	1	Trey
21	2	gots to stick with it	0001-01-01 00:00:00	2	Trey
22	2	Hi.	0001-01-01 00:00:00	1	Trey
23	2	yo	0001-01-01 00:00:00	2	Trey
24	2	Hi.	0001-01-01 00:00:00	1	Trey
25	2	Try this book.	0001-01-01 00:00:00	6	Trey
26	2	yeah	0001-01-01 00:00:00	1	Trey
27	2	hi	0001-01-01 00:00:00	1	Trey
28	2	yo	0001-01-01 00:00:00	4	Trey
29	2	yo	0001-01-01 00:00:00	6	Trey
30	2	jkl;h	0001-01-01 00:00:00	6	Trey
31	2	hi	0001-01-01 00:00:00	6	Trey
32	2	hi	0001-01-01 00:00:00	6	Trey
\.


--
-- TOC entry 3013 (class 0 OID 26065)
-- Dependencies: 206
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Users" ("Id", "Firstname", "Lastname", "Email", "Password", "CreatedDate", "LastActiveAt") FROM stdin;
1	TrevTheDev	Mearns	trevthedev@trevthedev.com	$2a$11$Jc90CU.ehxdoOH40WuEGfObnRLPRwqoMNTB0lz/r7CAcGYYJxCUNi	0001-01-01 00:00:00	0001-01-01 00:00:00
2	Trey	Dawg	treydawg@treydawg.com	$2a$11$w/A5KfKsJZSF8JXKHCQnl.q0mGslrmPjlHJgdC9oMPAf8QwrpYSB.	0001-01-01 00:00:00	0001-01-01 00:00:00
\.


--
-- TOC entry 3007 (class 0 OID 26038)
-- Dependencies: 200
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20211208003621_tables	3.1.0
\.


--
-- TOC entry 3019 (class 0 OID 0)
-- Dependencies: 201
-- Name: Channels_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Channels_Id_seq"', 1, false);


--
-- TOC entry 3020 (class 0 OID 0)
-- Dependencies: 203
-- Name: Messages_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Messages_Id_seq"', 32, true);


--
-- TOC entry 3021 (class 0 OID 0)
-- Dependencies: 205
-- Name: Users_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Users_Id_seq"', 2, true);


-- Completed on 2021-12-10 13:41:30

--
-- PostgreSQL database dump complete
--

